import Button from "@/components/button";
import Link from "next/link";
import FetchUser from "./utils/FetchUser";

export default async function page() {
  const response: User[] = await FetchUser();
  // console.log(response);
  return (
   <>
     hello from the home route
   </>
  );
}
