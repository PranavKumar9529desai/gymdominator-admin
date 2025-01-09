import { IsOwner } from "./lib/isGymOwner";
import { IsTrainer } from "./lib/isTrainer";
import { IsSales } from "./lib/isSales";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";
import { Session } from "next-auth";
/**
 * Public routes that are accessible without authentication
 * @type {string[]}
 */
const publicRoutes: string[] = []; // Remove "/" from public routes

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
  const session = request.auth as Session | null; // Use auth session instead of getToken

  /**
   * Check if the user is currently logged in
   * @type {boolean}
   */
  const isLoggedIn = !!session;

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
    if (isLoggedIn && session?.role) {
      console.log("Session in auth route:", session);
      return NextResponse.redirect(
        new URL(`/${session.role}dashboard`, nextUrl)
      );
    }
    console.log("auth route is called for the signin or signin", session?.role);
    return NextResponse.next();
  }

  // Allow access to public routes
  if (isPublicRoute) return NextResponse.next();

  /**
   * Handle protected routes with role-based access control
   */
  if (isProtectedRoute) {
    // Redirect to signin if not authenticated
    if (!isLoggedIn || !session) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    // Redirect to role selection only if the role in the token is empty if no role is assigned
    if (!session?.role) {
      console.log("No role assigned", session);
      return NextResponse.redirect(new URL("/selectrole", request.url));
    }

    // allow trainer to access the selectgym component 
    if( session?.role == "trainer" && !session?.gym){
      console.log("Trainer needs to select gym", session);
      return NextResponse.redirect(new URL("/selectgym", request.url));
    }
    /**
     * Check role-based access permissions
     * Redirect to unauthorized page if role doesn't match the route
     */
    const path = request.nextUrl.pathname;
    if (
      (path.startsWith("/owner") && !IsOwner(session)) ||
      (path.startsWith("/trainer") && !IsTrainer(session)) ||
      (path.startsWith("/sales") && !IsSales(session))
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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
