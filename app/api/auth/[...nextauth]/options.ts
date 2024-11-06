import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextRequest } from "next/server";
import signin from "../signin";
import GoogleProvider from "next-auth/providers/google";
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
      },
      async authorize(credentials, req: any) {
        console.log("here are the creedentials ", credentials);
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        let { username, password, email, role } = credentials || {};
        console.log("Crendential ", username, password, email, role);
        let user = {
          name: username || "",
          id: "1",
          email: email || " ",
          Role: role,
        };
        console.log("here is the user ", user);
        if (!user) return null;
        else {
          return user;
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
    async jwt({ token, user, profile, account }) {
      if (user && account) {
        token.accessToken = account?.access_token;
        token.id = user.id;
        token.name = user.name;
        token.role = user.Role;
        if (account.provider === "credentials") {
          token.role = user.Role;
        } else if (account.provider === "google") {
          // Assign a default role or fetch from your database
          token.role = "GYMOWNER"; // Or fetch the role based on user's email
        }
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
