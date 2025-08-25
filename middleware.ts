'use server';
import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from './functions/classes/dbServer';
// import { PROTECTED_ROUTES } from '@/settings/json/config';

export async function middleware(request: NextRequest, response: NextResponse) {
  const user = await updateSession();
  const pathname: string = request.nextUrl.pathname;
  // const isProtected = PROTECTED_ROUTES.some((path) =>
  //   pathname.startsWith(path),
  // );

  if (!user) {
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
