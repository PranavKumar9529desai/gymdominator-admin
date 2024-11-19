import { NextAuthOptions } from "next-auth";
export const authOptions: NextAuthOptions = {
  providers: [],
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {},
};
