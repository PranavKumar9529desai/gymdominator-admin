import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import authConfig from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  ...authConfig,
});
