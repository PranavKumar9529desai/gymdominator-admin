import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/options";
import SignUp from "@/components/common/Signup";
import { redirect } from "next/navigation";

export default async function page() {
  // let session = await getServerSession(authOptions);
  // if (session?.user) {
  //   redirect("/");
  // } else {
  return (
    <>
     
        <SignUp />
 
    </>
  );
}
// }
