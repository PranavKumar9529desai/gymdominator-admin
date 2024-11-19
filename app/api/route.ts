import { handlers } from "@/auth";
import NextAuth, { CredentialsSignin } from "next-auth";
import bcrypt from "bcrypt";
import { Role, UserExistsSA } from "../actions/SignupSA";
import Credentials from "next-auth/providers/credentials";
export const {  signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        name: {},
      },
      authorize: async (credentials: Partial<Record<"name" | "email" | "password", unknown>>) => {
        let user = null;

        // logic to salt and hash password
        const hashpassword = await bcrypt.hash(credentials.password as string, 3);
        let Role: Role = "gymOwner"; // default role
        // logic to verify if the user exists
        user = await UserExistsSA(
          Role,
          credentials.email as string,
          credentials.name as string,
          hashpassword
        );

        console.log("here is the logged in user");
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }

        // return user object with their profile data
        return user ? { name: user.name, email: user.email, password: user.password, Role: user.Role, Gym: user.Gym } : null;
      },
    }),
  ],
});
