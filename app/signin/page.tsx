import React from "react";
import { redirect } from "next/navigation";
import SignIn from "@/components/Signin";
import { auth } from "@/auth";
export default async function page() {
  const session = await auth();
  console.log("session informatiion is this", session);

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <SignIn />
      </div>
    </>
  );
}
