import NextAuth, { NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";
import SignupSA from "./app/actions/SignupSA";
import getUserByEmail, { userType } from "./app/actions/getUserByEmail";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import LoginSchema from "./app/schema/LoginSchem";
import { NextResponse } from "next/server";
import { Rolestype } from "./app/types/next-auth";
export default {
  providers: [
    Credentials({
      credentials: {
        name: {},
        email: {},
        password: {},
        role: {},
      },
      // @ts-ignore
      async authorize(
        credentials: Partial<
          Record<"name" | "email" | "password" | "role", unknown>
        >,
        req: Request
      ): Promise<
        | {
            name: string;
            email: string;
            role: string;
          }
        | null
        | undefined
      > {
        let user = null;
        // verify the login schema
        // const { email, password } = await LoginSchema.parseAsync(credentials);
        const { email, password, name, role } = credentials as {
          email: string;
          password: string;
          name: string;
          role: string;
        };
        console.log(
          "credentails received from the sigin are ",
          email,
          password,
          name,
          role
        );
        // name is not checked as the it is not necssary for the signin
        if (email && password && role) {
          let userFromDB: userType | false = await getUserByEmail(
            email,
            role as Rolestype
          );
          console.log("user from the db", userFromDB);
          if (userFromDB && userFromDB.name && userFromDB.email) {
            // check the password
            let isPasswordMatch = await bcrypt.compare(
              password,
              userFromDB.password
            );
            if (isPasswordMatch) {
              user = {
                name: userFromDB.name,
                email: userFromDB.email,
                role: role,
              };
              return user;
            } else {
              // how to throw the error as the invald password asnd show this is error in the frontend as well
              return null;
            }
          } else {
            let response: {
              msg: string;
              user: {
                name: string;
                email: string;
              } | null;
            } = await SignupSA(role, name, email, password);
            // check if the user is created
            if (response.user && response.user.name && response.user.email) {
              user = {
                name: response.user.name,
                email: response.user.email,
                role: role,
              };
              return user;
            }
          }
        } else {
          console.log("user", user);
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub,
  ],
  // TODO once the gym is created then add the gym details to the sesstion

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && account.provider === "google") {
        console.log("user in the google signin", user);
        if (user && user.email) {
          let userFromDb: userType | false =
            (await getUserByEmail(user.email, "gymOwner")) ||
            (await getUserByEmail(user.email, "trainer")) ||
            (await getUserByEmail(user.email, "sales"));

          if (userFromDb && userFromDb.name && userFromDb.email) {
            // login 
            if (await getUserByEmail(user.email, "gymOwner")) {
              user.role = "gymOwner";
            } else if (await getUserByEmail(user.email, "trainer")) {
              user.role = "trainer";
            } else if (await getUserByEmail(user.email, "sales")) {
              user.role = "sales";
            }
          }
          
        }
      }
      // if the user records not in the datbase then th token formed with the without role 
      console.log("user in the signin from the sign callback", user);
      return true;
    },
    async jwt({ user, account, token }) {
      if (user && user.email && user.name) {
        token.role = user.role;

        return token;
      }
      // console.log("token is this ", token);
      return token;
    },
    async session({ token, session }) {
      // console.log("session is called", token);
      if (token && token.email && token.name) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.role = token.role;
        return session;
      }
      // console.log("session is this ", token);
      return session;
    },
  },
} satisfies NextAuthConfig;
