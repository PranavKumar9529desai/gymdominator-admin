import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { IsOwner } from "./lib/isGymOwner";
import { IsTrainer } from "./lib/isTrainer";
import { IsSales } from "./lib/isSales";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

/**
 * Public routes that are accessible without authentication
 * @type {string[]}
 */
const publicRoutes: string[] = ["/"];

/**
 * Prefix for all authentication-related API routes
 * @type {string}
 */
const ApiRoutesPrefix: string = "/api/auth";

/**
 * Routes used for authentication purposes (login/signup)
 * @type {string[]}
 */
const AuthRoutes: string[] = ["/signin", "/signup"];

/**
 * Protected routes that require authentication and specific roles
 * @type {string[]}
 */
const ProtectedRoutes: string[] = ["/owner", "/trainer", "/sales"];

const { auth } = NextAuth(authConfig);

/**
 * Middleware function to handle authentication and authorization
 * @param {NextRequest} request - The incoming request object
 * @returns {Promise<NextResponse>} The response object with appropriate redirects or access
 */
export default auth(async function middleware(request) {
  const { nextUrl } = request;
  
  /**
   * Get the authentication token from the request
   * @type {JWT | null}
   */
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  
  /**
   * Check if the user is currently logged in
   * @type {boolean}
   */
  const isLoggedIn = !!request.auth;
  
  /**
   * Route type checks
   * @type {boolean}
   */
  const isApiRoute = nextUrl.pathname.startsWith(ApiRoutesPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = ProtectedRoutes.some((route) => 
    nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = AuthRoutes.includes(nextUrl.pathname);

  // Allow API routes to pass through
  if (isApiRoute) return NextResponse.next();

  /**
   * Handle authentication routes (signin/signup)
   * Redirect to role-specific dashboard if already authenticated
   */
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(`/${token?.role}dashboard`, nextUrl));
    }
    return NextResponse.next();
  }

  // Allow access to public routes
  if (isPublicRoute) return NextResponse.next();

  /**
   * Handle protected routes with role-based access control
   */
  if (isProtectedRoute) {
    // Redirect to signin if not authenticated
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    // Redirect to role selection if no role is assigned
    if (!token?.role) {
      return NextResponse.redirect(new URL("/selectrole", request.url));
    }

    /**
     * Check role-based access permissions
     * Redirect to unauthorized page if role doesn't match the route
     */
    const path = request.nextUrl.pathname;
    if (
      (path.startsWith("/owner") && !IsOwner(token)) ||
      (path.startsWith("/trainer") && !IsTrainer(token)) ||
      (path.startsWith("/sales") && !IsSales(token))
    ) {
      return NextResponse.rewrite(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  }
});

/**
 * Matcher configuration for the middleware
 * Excludes specific paths from middleware processing
 */
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
