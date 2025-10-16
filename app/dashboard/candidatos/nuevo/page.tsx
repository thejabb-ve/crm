import NewClient from './NewCandidate';
import Cookies from '@/functions/classes/cookies';
import Get from '@/functions/classes/getter';

const USER_LOGIN = process.env.USER_LOGIN as string;

export default async function Create() {
  const rawUserData = await Cookies.read(USER_LOGIN);
  const { enterprise_id, id }: Database.User = Get.userData(
    rawUserData as Database.User,
  );
  return (
    <section className="m-3 bg-transparent">
      <h1>Crear Nuevo Candidato</h1>
      <NewClient enterprise_id={enterprise_id as Database.id} id={id} />
    </section>
  );
}
