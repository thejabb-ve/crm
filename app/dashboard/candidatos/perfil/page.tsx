import Profile from './Profile';
import Logs from '@/components/Logs';
import CandidateStatus from '@/components/Status';
import CreateAccount from './CreateAccount';
import { getCandidate, getLogs } from '@/functions/server';
import { accounts, users, statuses, logs } from '@/settings/json/seed';
import { getOwner } from '@/functions/utils';
import TwoButtons from '@/components/TwoButtons';

const twoButtons: Interface.TwoButtonsProps = {
  button1: {
    ariaLabel: 'Crear un nuevo candidato',
    name: 'Crear un Candidato',
    href: '/dashboard/candidatos/nuevo',
  },
  button2: {
    ariaLabel: 'Ir a la lista de candidatos',
    name: 'Regresar',
    href: '/dashboard/candidatos',
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: { id: Database.id };
}) {
  const { id } = searchParams;

  const data: Database.Candidate = await getCandidate(accounts, id);
  if (!data)
    return (
      <section>
        <h1>Esta cuenta no existe</h1>
        <TwoButtons {...twoButtons} />
      </section>
    );

  const candidateLogs: Database.Logs[] = await getLogs(logs, id);
  const createdBy: string = getOwner(users, data.owner_id);

  return (
    <section className="m-3 bg-white">
      <h1>Perfil de {data.name}</h1>
      <CandidateStatus status={data.status} statuses={statuses} />
      <div className="grid w-full grid-cols-2 gap-3">
        <div>
          <Profile data={data} owner={createdBy} />
        </div>
        <div>
          <CreateAccount id={id} />
          <Logs logs={candidateLogs} users={users} />
        </div>
      </div>
    </section>
  );
}
