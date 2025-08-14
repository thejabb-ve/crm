'use server';
import db from './classes/database';
import Validation from './classes/validation';
import Cookies from './classes/cookies';
import Get from './classes/getter';
import { sha256 } from 'crypto-hash';
import { redirect } from 'next/navigation';

const SECRET = process.env.SECRET as string;
const USER_LOGIN = process.env.USER_LOGIN as string;
const USERS = process.env.USERS as string;
const STATUS = process.env.STATUS as string;

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
  Cookies.delete(process.env.USERS as string);
  redirect('/login');
}

export async function validateSession() {
  if (!Cookies.has(USER_LOGIN)) return;

  if (Cookies.has(USERS) && Cookies.has(STATUS)) return;

  const rawUserData = Cookies.read(USER_LOGIN);
  const user: Database.User = Get.userData(rawUserData as Database.User);

  try {
    const owners = (await db.select('users', 'id, name', {
      column: 'enterprise_id',
      value: user.enterprise_id as string,
    })) as Database.getOwner[];

    const statuses = (
      await db.select('enterprises', 'statuses', {
        column: 'id',
        value: user.enterprise_id as string,
        exclude: false,
      })
    )[0] as Database.getStatus;

    const ownerCookie: string = Cookies.jwt({ owners }, SECRET, 86_400);
    const statusCookie: string = Cookies.jwt(statuses, SECRET, 86_400);

    Cookies.set(USERS, ownerCookie);
    Cookies.set(STATUS, statusCookie);
  } catch {
    return await logout();
  }
}

export async function createElement(data: {}): Promise<Forms.Response> {
  try {
    const element: Query.Response | boolean = await db.insert(
      'accounts',
      data,
      true,
    );
    if (!element || (Array.isArray(element) && element.length === 0))
      return { response: 'Ocurrió un error, intente nuevamente', status: 500 };
    return {
      response: element[0].id as string,
      status: 201,
    };
  } catch {
    return { response: 'Ocurrió un error, intente nuevamente', status: 500 };
  }
}
