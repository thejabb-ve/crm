'use server';
import { NextResponse, type NextRequest } from 'next/server';
import { updateSession, Logout } from './functions/classes/dbServer';
// import { cookies } from 'next/headers';

const USER_LOGIN = process.env.USER_LOGIN as string;
// import { PROTECTED_ROUTES } from '@/settings/json/config';

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.has(USER_LOGIN);
  // const isProtected = PROTECTED_ROUTES.some((path) =>
  //   pathname.startsWith(path),
  // );

  if (!session) {
    await Logout();
  }

  const user = await updateSession();
  const pathname: string = request.nextUrl.pathname;
  if (!user && pathname !== '/login') {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  } else if ((user && pathname === '/login') || (user && pathname === '/')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|public|favicon.ico|images/).*)'],
};
