import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextRequest } from "next/server";
import signin from "../signin";
import { Account, Profile, User } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import GoogleProvider from "next-auth/providers/google";
import SignupSA, { UserExistsSA } from "@/app/actions/SignupSA";
import { Rolestype } from "@/app/types/next-auth";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
        gym: { label: "Gym", type: "text" },
      },
      async authorize(credentials, req) {
        console.log("here are the creedentials ", credentials);
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        let { username, password, email, role, gym } = credentials || {};
        if (!credentials && !gym && !role) {
          gym = req.cookie.tempGym;
          role = req.cookie.tempRole;
        }

        console.log("gym and role from the cookie ", gym, role);
        let user = {
          name: username || "",
          id: "1",
          email: email || " ",
          password: password || "",
          Role: role,
          Gym: gym || "",
        };
        console.log("here is the user ", user);
        let isUserexist:
          | false
          | { name: string; password: string; email: string } =
          await UserExistsSA(user.Role, user.email, user.name, user.password);

        if (isUserexist == false) {
          // create the user
          let name = username;
          console.log(
            "values form the  option ts ",
            role,
            name,
            email,
            password
          );
          let response = await SignupSA(
            user.Role as string,
            user.name as string,
            user.email as string,
            user.password as string
          );
          // console.log("created the user this catorgory ", response);
          console.log("user is created ", response);
          return response;
        } else {
          if (
            isUserexist.email == user.email &&
            isUserexist.password == user.password
          ) {
            return isUserexist;
          } else {
            return null;
          }
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // async signIn({ user, account, profile }) {
    //   let isUserexist:
    //     | false
    //     | { name: string; password: string; email: string } =
    //     await UserExistsSA(user.Role, user.email, user.name, user.password);

    //   if (isUserexist == false) {
    //     return false;
    //   } else {
    //     if (
    //       isUserexist.email == user.email &&
    //       isUserexist.password == user.password
    //     ) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }
    // },

    async jwt({ token, user, profile, account }) {
      if (user && account) {
        // @ts-ignore
        let response: SignupResponse = await SignupSA(
          user.name,
          user.email,
          user.password
        );
        token.accessToken = account?.access_token;
        token.name = response.owner.name;
        token.role = response.owner.role;
        console.log("response is this ", response);
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      session.accessToken = token.accessToken;
      session.user.name = token.name || " ";
      session.Role = "GYMOWNER";
      return session;
    },
  },
};
