import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { IsGymOwner } from "./lib/isGymOwner";
import { IsTrainer } from "./lib/isTrainer";
import { IsSales } from "./lib/isSales";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

/**
 * public routes are not checked for authentication as they are open to all
 * @type {string[]}
 */
let publicRoutes: string[] = ["/"];

/**
 * ApiRoutesPrefix is prefix for the all authentication routes that should be checked
 *  * @type {string}
 */
let ApiRoutesPrefix: string = "/api/auth";
/**
 * Routes starting with /owner /trainer /sales are protected routes
 * @type {string[]}
 */

let AuthRoutes: string[] = ["/signin", "/signup"];

/**
 * AuthRoute auth are used by the authentication purposes
 * if user is logged in redirect to defaultredirectRoute
 */
let ProtectedRoutes: string[] = ["/owner", "/trainer", "/sales"];

/**
 * Middleware to check if the user is authenticated
 * @param request
 * @returns
 */
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(request) {
  const { nextUrl } = request;
  console.log("request is this ", request.auth);
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  /**
   * Default redirect Route
   * @type {string}
   */
  let DefaultRedirectRoute: string = `/${token?.Role.toLowerCase()}dashboard`;
  console.log("DefaultRedirectRoute", DefaultRedirectRoute);

  const isLoggedIn = !!request.auth;
  console.log("isloggedin", isLoggedIn);

  let isApiRoute = nextUrl.pathname.startsWith(ApiRoutesPrefix);
  let isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  let isProctectedRoute = ProtectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  let isAuthRoute = AuthRoutes.includes(nextUrl.pathname);
  console.log(isApiRoute, isPublicRoute, isProctectedRoute, isAuthRoute);

  if (isApiRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    console.log("authRoute is called", isAuthRoute);
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DefaultRedirectRoute, nextUrl));
    }
  }

  if (isPublicRoute) {
    console.log("public is called ");
    return NextResponse.next();
  }
  console.log("token from the middleware", token);
  if (token) {
    const path = request.nextUrl.pathname;
    console.log("paht is this", path);
    if (path.startsWith("/owner")) {
      return IsGymOwner(token)
        ? NextResponse.next()
        : NextResponse.rewrite(new URL("/unauthorized", request.url));
    }

    if (path.startsWith("/trainer")) {
      return IsTrainer(token)
        ? NextResponse.next()
        : NextResponse.rewrite(new URL("/unauthorized", request.url));
    }

    if (path.startsWith("/sales")) {
      return IsSales(token)
        ? NextResponse.next()
        : NextResponse.rewrite(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    // Exclude authentication on the following paths:
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
