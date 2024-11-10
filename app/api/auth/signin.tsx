import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";
import { authOptions } from "./[...nextauth]/options";
import SignIn from "@/components/Signin";

export default async function signin() {
  let session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/");
  } else {
    return (
      <>
        <div className="w-screen  h-screen  justify-center items-center ">
          <SignIn />
        </div>
      </>
    );
  }
}
