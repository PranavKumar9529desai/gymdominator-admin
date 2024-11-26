// next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";
import { NextRequest } from "next/server";
type Rolestype = "gymOwner" | "trainer" | "sales";
// Extend the default Session type to include custom fields
interface GymType {
  name: string;
  id: string;
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    role: Rolestype;
    gym: GymType;
    user: {
      name?: string;
      id?: string;
      picture?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth" {
  interface User {
    name: string;
    email: string;
    role: Rolestype;
    gym?: GymType;
  }
}
// Extend the default JWT type to include custom fields
declare module "next-auth/jwt" {
  interface JWT {
    role: Rolestype;
    req: NextRequest;
    gym: GymType;
    accessToken?: string;
    user: {
      name: string;
      email: string;
      picture?: string;
    };
  }
}
