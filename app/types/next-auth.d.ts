// next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

type Rolestype = "ADMIN" | "TRAINER" | "SALES";
// Extend the default Session type to include custom fields
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    Role: Rolestype;
    user: {
      name?: string;
      id?: string;
      picture?: string;
    } & DefaultSession["user"];
  }
}

// Extend the default JWT type to include custom fields
declare module "next-auth/jwt" {
  interface JWT {
    Role: Rolestype;
    accessToken?: string;
    user: {
      name?: string;
      id?: string;
      picture?: string;
    };
  }
}
