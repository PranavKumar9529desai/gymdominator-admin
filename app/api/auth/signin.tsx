import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./[...nextauth]/route";
import { redirect } from "next/navigation";
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
