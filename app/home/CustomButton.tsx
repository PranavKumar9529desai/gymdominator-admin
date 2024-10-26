"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
export default function CustomButton() {
  let router = useRouter();
  return (
    <>
      <button
        className="flex bg-blue-600 hover:bg-blue-700 text-white font-bold py-[7px] px-10     rounded-full  sm:text-lg transition-all duration-200 ease-in-out transform hover:scale-105"
        onClick={() => {
          console.log("buton is clicked");
          router.push("/ownerdashboard");
        }}
      >
        Get Started
        <ArrowRight className="ml-2 h-5 w-5" />
      </button>
    </>
  );
}
