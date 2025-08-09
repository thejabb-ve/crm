import Candidates from './Candidates';
import { accounts, users, user } from '@/settings/json/seed';
import { Events } from 'jabb-astro-components';

export default async function Page({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const { query } = searchParams;
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

  return (
    <section>
      <h1>Candidatos</h1>
      <Candidates data={data} owners={users} query={query} />
    </section>
  );
}
