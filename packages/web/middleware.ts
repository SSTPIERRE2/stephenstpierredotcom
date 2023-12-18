import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const allowedOrigins = [
  'http://localhost:3000',
  'https://2-10-0-sandpack.codesandbox.io',
];

export function middleware(req: NextRequest) {
  // const res = NextResponse.next();
  // const origin = req.headers.get('origin');
  // console.log(`Middleware`, origin);
  // if (typeof origin === 'string' && allowedOrigins.includes(origin)) {
  // res.headers.append('Access-Control-Allow-Origin', '*');
  // }
  // res.headers.append('Access-Control-Allow-Credentials', 'true');
  // res.headers.append(
  //   'Access-Control-Allow-Methods',
  //   'GET,DELETE,PATCH,POST,PUT'
  // );
  // res.headers.append(
  //   'Access-Control-Allow-Headers',
  //   'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  // );
  // const nextUrl = req.nextUrl;
  // if (nextUrl.pathname === '/dashboard') {
  //   const authToken = req.cookies.get('authToken');
  //   console.log(
  //     'dashboard middleware, authToken: ',
  //     authToken,
  //     'pathName ',
  //     nextUrl.pathname,
  //     req.cookies.has('authToken'),
  //     req.url
  //   );
  //   if (req.cookies.has('authToken')) {
  //     return NextResponse.rewrite(new URL('/dashboard', req.url));
  //   } else {
  //     return NextResponse.rewrite(new URL('/dashboard/public', req.url));
  //   }
  // }
}
