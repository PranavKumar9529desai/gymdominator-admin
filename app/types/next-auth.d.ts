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
    Role: Rolestype;
    Gym: GymType;
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
    password: string;
    Role: Rolestype;
    Gym?: GymType;
  }
}
// Extend the default JWT type to include custom fields
declare module "next-auth/jwt" {
  interface JWT {
    Role: Rolestype;
    req: NextRequest;
    Gym: GymType;
    accessToken?: string;
    user: {
      name: string;
      email: string;
      picture?: string;
    };
  }
}