import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

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
}
