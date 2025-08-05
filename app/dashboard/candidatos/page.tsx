import Candidates from './Candidates';
import { accounts, users, user } from '@/settings/json/seed';
import { type } from '@/settings/json/config';

export default async function Page({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  let data: Database.Candidate[] = [];
  const { query } = searchParams;
  const candidateType = type.filter((item) => item.name === 'candidate')[0];
  let candidates: Database.Candidate[];

  if (query && query.length > 3) {
    candidates = accounts.filter(
      (item) =>
        item.name.indexOf(query) !== -1 || item.phone.indexOf(query) !== -1,
    );

    data = candidates;
  } else {
    candidates = accounts
      .filter((item) => item.type === candidateType.id)
      .filter((item) => item.owner_id === user.id);

    candidates.forEach((item, index) => {
      if (index <= 10) {
        data.push(item);
      }
    });
  }

  return (
    <section>
      <h1>Candidatos</h1>
      <Candidates data={data} owners={users} />
    </section>
  );
}
