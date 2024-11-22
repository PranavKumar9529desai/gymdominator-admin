import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import LoginSchema from "./app/schema/LoginSchem";
export default {
  providers: [
    Credentials({
      credentials: {
        name: {},
        email: {},
        password: {},
        role: {},
      },
      authorize: async (credentials) => {
        let user = null;
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
        if (email && password && role && name) {
          user = {
            name,
            email,
            Role: role,
          };
          console.log("user created in the credemtails provider", user);
          return user;
        } else {
          console.log("user", user);
          return null;
        }
        return user;
        // logic to salt and hash password
        // const pwHash = bcrypt.hash(password, 4);

        // logic to verify if the user exists
        // user = await getUserFromDb(credentials.email, pwHash)
        // No user found, so this is their first attempt to login
        // Optionally, this is also the place you could do a user registration
        // throw new Error("Invalid credentials.");

        // if (!user) {
      },
    }),
    Google,
    GitHub,
  ],
  callbacks: {
    async jwt({ user, account, token }) {
      console.log("jwt is called");
      console.log("user from the jwt", user);
      if (user && user.email && user.name) {
        token.Role = user.Role;
        
        // token.user.name = user.name;
        // token.user.email = user.email;
        return token;
      }
      console.log("token is this ", token);
      return token;
    },
    async session({ token, session }) {
      console.log("session is called", token);
      if (token && token.email && token.name) {
        session.user.name = token.name;
        session.user.email = token.email;
        return session;
      }
      console.log("session is this ", token);
      return session;
    },
  },
} satisfies NextAuthConfig;
