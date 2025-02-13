// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Get the session token from the cookies
  const sessionToken = request.cookies.get('next-auth.session-token')?.value;

  // 2. Define protected routes
  const protectedRoutes = ['/ki-chat']; // Add your protected routes here
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  // 3. If the user is not authenticated and tries to access a protected route, redirect to login
  if (isProtectedRoute && !sessionToken) {
    const loginUrl = "https://www.deepdive-ki.de/auth/signin";
    return NextResponse.redirect(loginUrl);
  }

  // 4. If the user is authenticated and tries to access the login page, redirect to the profilpage
  if (request.nextUrl.pathname.startsWith('/auth/signin') && sessionToken) {
    const profilUrl = "https://www.deepdive-ki.de/profil";
    return NextResponse.redirect(profilUrl);
  }

  // 5. Allow the request to proceed if no conditions are met
  return NextResponse.next();
}

// Optional: Configure the middleware to run on specific paths
export const config = {
  matcher: ['/:path*'],
};