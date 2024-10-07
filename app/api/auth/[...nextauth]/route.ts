import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";
// authprovider
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        // age: { label: "Age", type: "Number" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = {
          id: "1",
          name: "pranav",
          email: "jsmith@example.com",
          password: "pranav",
        };
        let isAuthenticated: boolean = false;
        let { username, password } = req.body as FormData;
        if (user.name === username && user.password === password) {
          isAuthenticated = true;
        }
        if (user.name === username && user.password === password) {
          console.log("User is authenticated");
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    // google provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || " ",
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/signin",
    // this is the custom signin page 
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is seth
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
