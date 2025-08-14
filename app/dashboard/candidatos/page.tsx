import { Events } from 'jabb-astro-components';
import Candidates from './Candidates';
import Cookies from '@/functions/classes/cookies';
import Get from '@/functions/classes/getter';
import Database from '@/functions/classes/database';

const USER_LOGIN = process.env.USER_LOGIN as string;
const USERS = process.env.USERS as string;

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
  const rawUserData = Cookies.read(USER_LOGIN);
  const user: Database.User = Get.userData(rawUserData as Database.User);
  const rawUsersData = Cookies.read(USERS) as { owners: Database.getOwner[] };
  const accounts = (await Database.select('accounts', '*', {
    column: 'enterprise_id',
    value: user.enterprise_id as string,
  })) as Database.Account[];

  const data = await getData(user, accounts, query);
  const users = rawUsersData.owners;

  return (
    <section>
      <h1>Candidatos</h1>
      <Candidates data={data} owners={users} query={query} />
    </section>
  );
}
