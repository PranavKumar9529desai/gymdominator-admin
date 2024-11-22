import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { IsGymOwner } from "./lib/isGymOwner";
import { IsTrainer } from "./lib/isTrainer";
import { IsSales } from "./lib/isSales";

export default async function middleware(request: NextRequest) {
  // const token = await getToken({
  //   req: request,
  //   secret: process.env.NEXTAUTH_SECRET,
  // });
  // console.log("token from the middleware", token);

  // if (!token) {
  //   // return NextResponse.redirect(new URL("/signin", request.url));
  //   console.log("where is the token , i am not allowing you ");
  // }

  // const path = request.nextUrl.pathname;
  // if (path.startsWith("/owner")) {
  //   return IsGymOwner(token)
  //     ? NextResponse.next()
  //     : NextResponse.rewrite(new URL("/unauthorized", request.url));
  // }

  // if (path.startsWith("/trainer")) {
  //   return IsTrainer(token)
  //     ? NextResponse.next()
  //     : NextResponse.rewrite(new URL("/unauthorized", request.url));
  // }

  // if (path.startsWith("/sales")) {
  //   return IsSales(token)
  //     ? NextResponse.next()
  //     : NextResponse.rewrite(new URL("/unauthorized", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude authentication on the following paths:
    "/((?!api|_next/static|_next/image|favicon.ico|signin|signup).*)",
  ],
};
