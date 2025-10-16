import { SignJWT, importJWK, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
export default class Cookies {
  private static async createToken(data: {}, expiresIn = '24h') {
    const KEY = JSON.parse(process.env.PRIVATE_KEY!);
    const privateKey = await importJWK(KEY, 'RS256');

    // Firmar el token usando la llave privada
    const token = await new SignJWT(data)
      .setProtectedHeader({
        alg: 'RS256',
      })
      .setIssuedAt()
      .setExpirationTime(expiresIn)
      .sign(privateKey);

    return token;
  }

  public static async jwt(
    data: {},
    SECRET?: string,
    expiresIn = '24h',
  ): Promise<string> {
    const token = await this.createToken(data, expiresIn);

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
    httpOnly: true,
    // sameSite: '',
    // path: '/',
  };

  public static set = (name: string, value: string) =>
    cookies().set({
      name,
      value,
      sameSite: 'strict',
      ...this.settingCookie,
    });

  public static async read(cookie: any, SECRET?: string): Promise<any> {
    if (!cookie) return '';
    const COOKIE = cookies().get(cookie);
    const secret = JSON.parse(process.env.PUBLIC_KEY!);
    try {
      const publicKey = await importJWK(secret, 'RS256');
      const { payload } = await jwtVerify(COOKIE?.value!, publicKey, {
        // issuer: iss,
        // audience: aud,
        algorithms: ['RS256'],
      });

      return payload;
    } catch (err) {
      return err;
    }
  }

  public static delete(name: string) {
    return cookies().delete(name);
  }

  public static has(name: string): boolean {
    return cookies().has(name);
  }

  public static async verify(cookie: any): Promise<boolean> {
    const secret = JSON.parse(process.env.PUBLIC_KEY!);
    try {
      const publicKey = await importJWK(secret, 'RS256');
      const { payload } = await jwtVerify(cookie.value, publicKey, {
        algorithms: ['RS256'],
      });

      return true;
    } catch {
      return false;
    }
  }
}
