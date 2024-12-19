// next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { NextRequest } from "next/server";
type Rolestype = "owner" | "trainer" | "sales";
// Extend the default Session type to include custom fields

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    role: Rolestype;
    gym: gym;
    user: {
      name?: string;
      id?: string;
      picture?: string;
    } & DefaultSession["user"];
  }
  interface JWT {
    role: Rolestype;
    req: NextRequest;
    gym: gym;
    accessToken?: string;
    user: {
      name: string;
      email: string;
      picture?: string;
    } & DefaultJWT["user"];
  }
}

declare module "next-auth" {
  interface User {
    name: string;
    email: string;
    role: Rolestype;
    gym?: gym;
  }
  // Extend the default JWT type to include custom fields
  declare module "next-auth/jwt" {
    interface JWT {
      role: Rolestype;
      req: NextRequest;
      gym: gym;
      accessToken?: string;
      user: {
        name: string;
        email: string;
        picture?: string;
      } & DefaultJWT["user"];
    }
  }
}
