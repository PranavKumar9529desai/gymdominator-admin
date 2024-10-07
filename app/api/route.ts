import { NextRequest, NextResponse } from "next/server";

// in route handler we can't use the default keyword
export function GET(req: NextRequest) {
  const data = req.nextUrl.pathname;

  return Response.json({ msg: "welocme to the route handler", data: data });
  // using native response object in the provided by the broswer
}
