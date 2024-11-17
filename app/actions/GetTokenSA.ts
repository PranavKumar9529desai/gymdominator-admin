import "server-only";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
export default async function GetTokenSA() {
  const cookieStore = await cookies();
  const token = await getToken({
    // @ts-ignore
    req: { cookies: cookieStore },
    secret: process.env.NEXTAUTH_SECRET,
  });

  return token;
}
