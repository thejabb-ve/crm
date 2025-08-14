import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.SECRET as string;
export default class Cookies {
  public static jwt(
    data: Cookies.Data,
    SECRET: string,
    expiresIn: number,
  ): string {
    const token: string = jwt.sign(data, SECRET, {
      expiresIn,
    });

    return token;
  }

  private static settingCookie: {
    maxAge?: number;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: boolean;
    path?: string;
  } = {
    maxAge: 86_400,
    secure: true,
    // httpOnly: true,
    sameSite: true,
    path: '/',
  };

  public static set = (name: string, value: string) =>
    cookies().set({
      name,
      value,
      ...this.settingCookie,
    });

  public static read(COOKIE: string, SECRET?: string): jwt.JwtPayload | string {
    const cookie = cookies().get(COOKIE);
    if (!cookie) return '';

    const secret: string = (SECRET as string) || SECRET_KEY;
    const token: string = cookie.value;

    const data = jwt.verify(token, secret) as jwt.JwtPayload;
    return data;
  }

  public static delete(name: string) {
    return cookies().delete(name);
  }

  public static has(name: string): boolean {
    return cookies().has(name);
  }
}
