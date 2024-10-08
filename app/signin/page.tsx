import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignIn from "@/components/Signin";
export default async function signin() {
  let session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/");
  } else {
    return (
      <>
        <SignIn />
      </>
    );
  }
}
