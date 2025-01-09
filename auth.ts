import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  // @ts-expect-error - NextAuth types mismatch with custom config
  session: { strategy: "jwt" },
  ...authConfig,
});
