'use server';
import db from './classes/dbClient';
import { Login, Logout } from './classes/dbServer';
import type { Session } from '@supabase/supabase-js';
import Validation from './classes/validation';
import Cookies from './classes/cookies';
import Get from './classes/getter';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

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

  try {
    const {
      user: { id: value },
      session,
    } = (await Login(username, password)) as {
      user: { id: string };
      session: Session;
    };
    if (!session)
      return { response: 'Usuario o contraseña incorrecta', status: 400 };

    const user = (
      await db.select('users', '*', {
        column: 'auth_id',
        value,
      })
    )[0] as Database.User;

    const { password: userPwd, recent_viewed, ...data } = user;

    const userId: string = await Cookies.jwt(data, SECRET, '72h');
    const recentViewed: string = await Cookies.jwt(
      { recent_viewed },
      SECRET,
      '72h',
    );

    Cookies.set(USER_LOGIN, userId);
    Cookies.set(RECENT, recentViewed);

    return { response: 'Sesión iniciada', status: 200 };
  } catch (err) {
    console.log(err);
    return { response: 'Ocurrió un error, intente nuevamente', status: 500 };
  }
}

export async function logout() {
  Cookies.delete(USER_LOGIN);
  Cookies.delete(USERS);
  Cookies.delete(STATUS);
  Cookies.delete(RECENT);
  await Logout();
  redirect('/login');
}

export async function validateSession() {
  if (!cookies().has(USER_LOGIN)) return await logout();
  if (cookies().has(USERS) && cookies().has(STATUS)) return;

  const cookieUser = cookies().get(USER_LOGIN);
  const rawUserData = await Cookies.read(cookieUser);
  const user: Database.User = Get.userData(rawUserData as Database.User);

  try {
    const owners = (await db.select('users', 'id, name', {
      column: 'enterprise_id',
      value: user.enterprise_id as string,
    })) as Database.getOwner[];

    const enterprise = (
      await db.select('enterprises', 'name, tier, statuses, roles, img', {
        column: 'id',
        value: user.enterprise_id as string,
        exclude: false,
      })
    )[0] as Database.getEnterprise;

    const ownerCookie: string = await Cookies.jwt({ owners }, SECRET, '72h');
    const statusCookie: string = await Cookies.jwt(
      { statuses: enterprise.statuses },
      SECRET,
      '72h',
    );

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
  const data: string = await Cookies.jwt(query, SECRET, '72h');
  Cookies.set(RECENT, data);
}
