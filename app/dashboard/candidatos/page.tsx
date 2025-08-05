import Candidates from './Candidates';
import { accounts, users } from '@/settings/json/seed';

export default async function Page() {
  return (
    <section>
      <h1>Candidatos</h1>
      <Candidates data={accounts} owners={users} />
    </section>
  );
}
