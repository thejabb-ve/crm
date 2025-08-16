import { Events } from 'jabb-astro-components';
import Candidates from './Candidates';
import Cookies from '@/functions/classes/cookies';
import Get from '@/functions/classes/getter';
import Database from '@/functions/classes/database';

const USER = process.env.USER_LOGIN as string;
const USERS = process.env.USERS as string;
const STATUS = process.env.STATUS as string;
const RECENT = process.env.RECENT as string;

async function getData(
  user: Database.User,
  accounts: Database.Account[],
  query?: string,
): Promise<Database.Candidate[]> {
  let candidates: Database.Candidate[];
  let data: Database.Candidate[] = [];

  if (query) {
    candidates = accounts.filter(({ type, name, phone }) => {
      const slugifyName: string = Events.Utils.slugify(name);
      const slugifyQuery: string = Events.Utils.slugify(query);

      return (
        type === 1 &&
        (slugifyName.indexOf(slugifyQuery) !== -1 ||
          phone.indexOf(slugifyQuery) !== -1)
      );
    });

    data = candidates;
  } else {
    candidates = accounts.filter(
      ({ type, owner_id }) => type === 1 && owner_id === user.id,
    );

    candidates.forEach((item, index) => {
      if (index <= 10) {
        data.push(item);
      }
    });
  }

  return data;
}

export default async function Page({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const { query } = searchParams;

  const rawUserData = Cookies.read(USER);
  const rawUsersData = Cookies.read(USERS) as { owners: Database.getOwner[] };
  const rawStatusData = Cookies.read(STATUS) as Database.getStatus;
  const rawRecent = Cookies.read(RECENT) as Database.getRecent;

  const user: Database.User = Get.userData(rawUserData as Database.User);
  const accounts = (await Database.select('accounts', '*', {
    column: 'enterprise_id',
    value: user.enterprise_id as string,
  })) as Database.Account[];
  const recent: Database.Recent[] = rawRecent.recent_viewed;

  const data = await getData(user, accounts, query);
  const users = rawUsersData.owners;
  const statuses: Database.Status[] = rawStatusData.statuses;

  return (
    <section>
      <h1>Candidatos</h1>
      <Candidates
        statuses={statuses}
        data={data}
        userId={user.id as string}
        owners={users}
        query={query}
        recent={recent}
      />
    </section>
  );
}
