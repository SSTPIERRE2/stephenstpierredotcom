import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const nextUrl = req.nextUrl;
  if (nextUrl.pathname === '/dashboard') {
    const authToken = req.cookies.get('authToken');

    console.log(
      'dashboard middleware, authToken: ',
      authToken,
      'pathName ',
      nextUrl.pathname,
      req.cookies.has('authToken'),
      req.url
    );

    if (req.cookies.has('authToken')) {
      return NextResponse.rewrite(new URL('/dashboard', req.url));
    } else {
      return NextResponse.rewrite(new URL('/dashboard/public', req.url));
    }
  }
}
