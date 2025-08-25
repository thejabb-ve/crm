import Profile from './Profile';
import Logs from '@/components/Logs';
import CandidateStatus from '@/components/Status';
// import CreateAccount from './CreateAccount';
import Cookies from '@/functions/classes/cookies';
import Database from '@/functions/classes/dbClient';
import Get from '@/functions/classes/getter';
import TwoButtons from '@/components/TwoButtons';

const STATUS = process.env.STATUS as string;
const USERS = process.env.USERS as string;
const USER = process.env.USER_LOGIN as string;

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

  const rawStatusData = Cookies.read(STATUS) as Database.getStatus;
  const rawUserData = Cookies.read(USER) as Database.User;

  const statuses: Database.Status[] = rawStatusData.statuses;
  const user: Database.User = Get.userData(rawUserData as Database.User);

  const data = (
    await Database.select('accounts', '*', {
      column: 'id',
      value: id as string,
      exclude: false,
    })
  )[0] as Database.Candidate;

  const logs = (await Database.select('logs', '*', {
    column: 'account_id',
    value: id as string,
    exclude: false,
  })) as Database.Logs[];

  if (!data)
    return (
      <section>
        <h1>Esta cuenta no existe</h1>
        <TwoButtons {...twoButtons} />
      </section>
    );

  const rawOwnersData = Cookies.read(USERS) as { owners: Database.getOwner[] };
  const owners = rawOwnersData.owners;
  const createdBy: string = Get.filter(owners, data.owner_id).name;

  return (
    <section className="m-3 bg-white">
      <h1>Perfil de {data.name}</h1>
      <CandidateStatus status={data.status} statuses={statuses} />
      <div className="grid w-full grid-cols-2 gap-3">
        <div>
          <Profile data={data} owner={createdBy} />
        </div>
        <div>
          {/* <CreateAccount id={id} /> */}
          <Logs
            created_by={user.id}
            account_id={id}
            logs={logs.reverse()}
            owners={owners}
            status={data.status}
            statuses={statuses}
          />
        </div>
      </div>
    </section>
  );
}
