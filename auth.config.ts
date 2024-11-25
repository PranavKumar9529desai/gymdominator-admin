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
        Role: {},
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
            Role: string;
          }
        | null
        | undefined
      > {
        let user = null;
        // verify the login schema
        // const { email, password } = await LoginSchema.parseAsync(credentials);
        const { email, password, name, Role } = credentials as {
          email: string;
          password: string;
          name: string;
          Role: string;
        };
        console.log(
          "credentails received from the sigin are ",
          email,
          password,
          name,
          Role
        );
        if (email && password && Role) {
          let userFromDB: userType | false = await getUserByEmail(
            email,
            Role as Rolestype
          );
          console.log("user from the db", userFromDB);
          if (userFromDB && userFromDB.name && userFromDB.email) {
            // check the password
            let isPasswordMatch = await bcrypt.compare(
              password,
              userFromDB.password
            );
            console.log("is password match", isPasswordMatch);
            if (isPasswordMatch) {
              user = {
                name: userFromDB.name,
                email: userFromDB.email,
                Role: Role,
              };
              console.log("user created in the credemtails provider", user);
              return user;
            } else {
              console.log("user", user);
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
            } = await SignupSA(Role, name, email, password);
            console.log("user after signup is ", response);
            // check if the user is created
            if (response.user && response.user.name && response.user.email) {
              user = {
                name: response.user.name,
                email: response.user.email,
                Role: Role,
              };
              console.log("user created in the credemtails provider", user);
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
        console.log("account is google");
        user.Role = "gymOwner";
        // user.Role = "gymOwner";
      }
      console.log("sign in is called");
      console.log("user from the sign in", user);
      return true;
    },
    async jwt({ user, account, token }) {
      console.log("jwt is called");
      console.log("user from the jwt", user);
      if (user && user.email && user.name) {
        token.Role = user.Role;

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
        return session;
      }
      // console.log("session is this ", token);
      return session;
    },
  },
} satisfies NextAuthConfig;
