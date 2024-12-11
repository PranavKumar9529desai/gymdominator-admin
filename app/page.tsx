import Button from "@/components/button";
import Link from "next/link";
import FetchUser from "./utils/FetchUser";
import HeroSection from "./home/page";

export default async function page() {
  const response: User[] = await FetchUser();
  // console.log(response);
  // console.("here are the resnponse");
  return (
    <>
      <HeroSection />
    </>
  );
}
