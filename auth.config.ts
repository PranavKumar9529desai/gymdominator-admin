import NextAuth, { NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";
import SignupSA from "./app/actions/signup/SignUpWithCrendentails";
import getUserByEmail, { userType } from "./app/actions/signup/getUserByEmail";
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
        if (email && password ) {
          let userFromDB: userType | false = await getUserByEmail(
            email,
          );
          console.log("user from the db", userFromDB);
           // signin 
          if (userFromDB && userFromDB.name && userFromDB.email&& userFromDB.role) {
            // check the password
            let isPasswordMatch = await bcrypt.compare(
              password,
              userFromDB.password
            );
            if (isPasswordMatch) {
              user = {
                name: userFromDB.name,
                email: userFromDB.email,
                role: userFromDB.role,
              };
              return user;
            } else {
              // how to throw the error as the invald password asnd show this is error in the frontend as well
              return null;
            }
          } else {
            // as record doesn't exist signing up
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
        // google signin and signup
        console.log("user in the google signin", user);
        if (user && user.email) {
          // check if the user is already in the database
          let userFromDb: userType | false = await getUserByEmail(
            user.email,
          );
          if (userFromDb && userFromDb.name && userFromDb.email && userFromDb.role) {
            // login
              user.role = userFromDb.role as Rolestype;
              user.name = userFromDb.name;
              user.email = userFromDb.email;
          }
            // signup
            // as without role we dont know what to type of user ,
             // here allow user to signup once the user selecs the role we do backend call to create the user in the database[
            console.log("user is this from the google signin callback", user);
            return true;
        }
        console.log("user objeect seem to be empty", user);
         return false;

      }
      // if the user records not in the datbase then th token formed with the without role
      console.log("user in the signin from the sign callback", user);
      return true;
    },
    async jwt({ user, account, token, trigger, session }) {
      console.log("trigger is this ", trigger);
      console.log("session from the jwt callback ", session);
      console.log("token from the jwt callback ", token);
      console.log("user from the jwt callback ", user);
      if (trigger === "update") {
        console.log(
          "token is updating...",
          token,
          session?.user?.role,
          session?.role
        );
        token.role = session?.user?.role || session?.role;
        console.log("token is updated to this ", token);
        return token;
      }
      if (user && user.email && user.name) {
        token.role = user.role;
        return token;
      }
      //  as we can't update the token directly so we are updating the session then using the session callback we are updating the token
      // console.log("token is this ", token);
      return token;
    },
    async session({ token, session }) {
      console.log("token from the session callback ", token);
      if (token && token.email && token.name) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.role = token.role;
        console.log("session is this from the session callback ", session);
        return session;
      }
      console.log("session is this from the session callback ", session);
      return session;
    },
  },
} satisfies NextAuthConfig;
