// src/middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define paths that are protected
  const isProtectedPath = path.startsWith('/admin');
  const isAuthPath = path.startsWith('/auth');

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect to login if accessing protected path without token
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Redirect to admin dashboard if accessing auth paths while logged in
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Check admin role for admin paths
  if (isProtectedPath && token?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*']
};