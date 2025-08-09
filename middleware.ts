'use server';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest, response: NextResponse) {
  const cookiesStore = cookies();
  const session = cookiesStore.has(process.env.USER_LOGIN as string);
  const pathname: string = request.nextUrl.pathname;

  if (pathname !== '/login' && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else if (
    (session && pathname === '/login') ||
    (session && pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images/).*)'],
};
