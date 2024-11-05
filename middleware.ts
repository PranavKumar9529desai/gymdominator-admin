import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  // console.log()
  let token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // let sesssion = await getServerSession();
  // console.log("session details are",sesssion?.user);
  console.log("here is the token", token);
  return NextResponse.next();
}
