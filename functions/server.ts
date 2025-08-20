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
const RECENT = process.env.RECENT as string;

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
    const auth = await db.login(username, password);
    console.log(auth);

    const pwd: string = await sha256(password);
    const user = (
      await db.select('users', '*', {
        column: 'email',
        value: validUser,
      })
    )[0] as Database.User;

    const { password: userPwd, recent_viewed, ...data } = user;

    if (pwd !== userPwd)
      return { response: 'Usuario o contraseña incorrecta', status: 400 };

    const userId: string = Cookies.jwt(data, SECRET, 86_400);
    const recentViewed: string = Cookies.jwt(
      { recent_viewed: recent_viewed as Database.Recent[] },
      SECRET,
      86_400,
    );

    Cookies.set(USER_LOGIN, userId);
    Cookies.set(RECENT, recentViewed);

    return { response: 'Sesión iniciada', status: 200 };
  } catch {
    return { response: 'Ocurrió un error, intente nuevamente', status: 500 };
  }
}

export async function logout() {
  Cookies.delete(USER_LOGIN);
  Cookies.delete(USERS);
  Cookies.delete(STATUS);
  Cookies.delete(RECENT);
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

export async function createElement(
  table: string,
  data: {},
): Promise<Forms.Response> {
  try {
    const element: Query.Response | boolean = await db.insert(
      table,
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

export async function updateElement(
  table: string,
  data: {},
  { column, value }: { column: string; value: string | number },
): Promise<Forms.Response> {
  try {
    const element: Query.Response = await db.update(table, data, {
      column,
      value,
    });
    if (!element || (Array.isArray(element) && element.length === 0))
      return {
        response: 'Ocurrió un error, intente nuevamente',
        status: 500,
      };
    return { response: JSON.stringify(element[0]), status: 201 };
  } catch {
    return { response: 'Ocurrió un error, intente nuevamente', status: 500 };
  }
}

export async function updateStatus(
  value: string,
  via: number,
  status: number,
  statuses: Database.Status[],
): Promise<Forms.Response> {
  if (status <= 0 || status > statuses.length)
    return { response: 'Estado inválido', status: 400 };

  if (status > 1) return { response: 'Usuario abierto', status: 200 };

  //Use Via in future
  console.log(via);
  // ----------------

  try {
    await db.update('accounts', { status: 2 }, { column: 'id', value });
    return { response: 'Estado actualizado exitosamente', status: 201 };
  } catch {
    return { response: 'Ocurrió un error, intente nuevamente', status: 500 };
  }
}

export async function refreshRecent(query: Cookies.Data) {
  Cookies.delete(RECENT);
  const data: string = Cookies.jwt(query, SECRET, 86_400);
  Cookies.set(RECENT, data);
}
