import React from "react";
import SignIn from "@/components/Signin";
import { auth } from "@/auth";

export default async function Page() {
  // const session = await auth();
  // console.log("session information is this", session);
  return (
    <>
      <SignIn />
    </>

);
}
