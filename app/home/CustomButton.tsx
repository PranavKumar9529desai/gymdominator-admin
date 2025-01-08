"use client";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CustomButton({ role, redirect }: { role: string, redirect: boolean }) {
  const router = useRouter();
  console.log("redirect from the custom button  ", redirect);
  let route = role;
  if (role === "owner") {
    route = "owner";
  }

  console.log("role from the custom button  ", role);
  return (
    <>
      <button
        className="flex bg-blue-600 hover:bg-blue-700 text-white font-bold py-[7px] px-10 rounded-full sm:text-lg transition-all duration-200 ease-in-out transform hover:scale-105"
        onClick={() => {
          console.log("button is clicked");
          void (redirect ? router.push("/signin") : router.push(`/${route}dashboard`));
        }}
      >
        Get Started
        <ArrowRight className="ml-2 h-5 w-5" />
      </button>
    </>
  );
}
