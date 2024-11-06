// next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

type Rolestype = "GYMOWNER" | "TRAINER" | "SALES";
// Extend the default Session type to include custom fields
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    Role: Rolestype;
    Gym: string;
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
    name: string;
    Role: Rolestypeu;
  }
}
// Extend the default JWT type to include custom fields
declare module "next-auth/jwt" {
  interface JWT {
    Role: Rolestype;
    Gym: string;
    accessToken?: string;
    user: {
      name?: string;
      id?: string;
      picture?: string;
    };
  }
}
