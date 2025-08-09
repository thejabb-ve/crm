'use server';
import db from './classes/database';
import Validation from './classes/validation';
import Cookies from './classes/cookies';
import { sha256 } from 'crypto-hash';
import { redirect } from 'next/navigation';

const SECRET = process.env.SECRET as string;

export async function login({
  username,
  password,
}: Forms.Data): Promise<Forms.Response> {
  if (!username || !password)
    return { response: 'Usuario o contraseña incorrecta', status: 400 };

  if (!Validation.password(password))
    return { response: 'Usuario o contraseña incorrecta', status: 400 };

  const validUser: string = Validation.username(username);

  try {
    const pwd: string = await sha256(password);
    const user = (
      await db.select('users', '*', {
        column: 'email',
        value: validUser,
      })
    )[0] as Database.User;

    const { password: userPwd, ...data } = user;

    if (pwd !== userPwd)
      return { response: 'Usuario o contraseña incorrecta', status: 400 };

    const userId: string = Cookies.jwt(data, SECRET, 86_400);

    Cookies.set(process.env.USER_LOGIN as string, userId);

    return { response: 'Sesión iniciada', status: 200 };
  } catch {
    return { response: 'Ocurrió un error, intente nuevamente', status: 500 };
  }
}

export async function logout() {
  Cookies.delete(process.env.USER_LOGIN as string);
  redirect('/login');
}

export async function createElement() {
  console.log('created');
}

export async function getCandidate(
  data: Database.Candidate[],
  id: Database.id,
): Promise<Database.Candidate> {
  const result: Database.Candidate = data.filter(
    (item) => item.id === Number(id),
  )[0];

  return result;
}

export async function getLogs(
  data: Database.Logs[],
  id: Database.id,
): Promise<Database.Logs[]> {
  const result: Database.Logs[] = data.filter(
    ({ account_id }) => account_id === Number(id),
  );

  return result;
}
