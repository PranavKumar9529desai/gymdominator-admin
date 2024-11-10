// next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";
import { NextRequest } from "next/server";
type Rolestype = "GYMOWNER" | "TRAINER" | "SALES";
// Extend the default Session type to include custom fields

interface Callbacks {
  signIn: (
    params: {
      user: User | AdapterUser;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, unknown>;
    },
    /** Added context parameter */
    req: NextApiRequest
  ) => Awaitable<boolean | string>;
}

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
    Gym: string;
  }
}
// Extend the default JWT type to include custom fields
declare module "next-auth/jwt" {
  interface JWT {
    Role: Rolestype;
    req: NextRequest;
    Gym: string;
    accessToken?: string;
    user: {
      name?: string;
      id?: string;
      picture?: string;
    };
  }
}
