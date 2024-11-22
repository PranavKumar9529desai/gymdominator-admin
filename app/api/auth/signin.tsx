import React from "react";
import { redirect } from "next/navigation";
import SignIn from "@/components/Signin";
import { auth } from "@/auth";
export default async function signin() {
  return (
    <>
      <div className="w-screen  h-screen  justify-center items-center ">
        <SignIn />
      </div>
    </>
  );
}
