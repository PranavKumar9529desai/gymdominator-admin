import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextRequest } from "next/server";
import signin from "../signin";
import { Account, Profile, User } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
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
          Role: role,
          Gym: gym || "",
        };
        console.log("here is the user ", user);
        if (!role && !user) return null;
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
    // async signIn(
    //   params: {
    //     user: any;
    //     account: any;
    //     profile: any;
    //     email?: any;
    //     credentials?: any;
    //   },
    //   reqContext: { req: NextApiRequest; res: NextApiResponse }
    // ): Promise<boolean> {
    //   const { user, account } = params;
    //   const { req, res } = reqContext;

    //   console.log("SignIn Callback: Triggered.");
    //   console.log("SignIn Callback: Account Provider:", account?.provider);

    //   if (account?.provider === "google") {
    //     try {
    //       // Parse cookies from the request headers
    //       const cookies = parse(req.headers.cookie || "");
    //       console.log("SignIn Callback: Parsed cookies:", cookies);
    //       const role = cookies.tempRole;
    //       const gym = cookies.tempGym;

    //       if (role && gym) {
    //         // Attach the role and gym to the user object
    //         user.role = role;
    //         user.gym = gym;

    //         console.log(
    //           "SignIn Callback: Attached role and gym to user:",
    //           user
    //         );

    //         // Clear the tempRole and tempGym cookies
    //         res.setHeader(
    //           "Set-Cookie",
    //           [
    //             `tempRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict`,
    //             `tempGym=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict`,
    //           ].join(", ")
    //         );

    //         console.log(
    //           "SignIn Callback: Cleared tempRole and tempGym cookies."
    //         );
    //       } else {
    //         // If role or gym is not found, deny sign-in
    //         console.log(
    //           "SignIn Callback: Missing role or gym. Denying sign-in."
    //         );
    //         return false;
    //       }
    //     } catch (error) {
    //       console.error(
    //         "SignIn Callback: Error while processing cookies:",
    //         error
    //       );
    //       return false;
    //     }
    //   }

    //   console.log("SignIn Callback: Sign-in allowed.");
    //   return true;
    // },
    async jwt({ token, user, profile, account }) {
      if (user && account) {
        token.accessToken = account?.access_token;
        token.name = user.name;
        token.role = user.Role;
        if (account.provider === "credentials") {
          token.role = user.Role;
        } else if (account.provider === "google") {
          // Assign a default role or fetch from your database
          // this is for the signup attempt once the role is dtermined fomr the backend then we can easily rewrite this

          token.Role = "GYMOWNER"; // Or fetch the role based on user's email
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
