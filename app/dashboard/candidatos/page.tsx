import Candidates from './Candidates';
import { candidates } from '@/settings/json/seed';

export default async function Page() {
  return (
    <section>
      <h1>Candidatos</h1>
      <Candidates data={candidates} />
    </section>
  );
}
