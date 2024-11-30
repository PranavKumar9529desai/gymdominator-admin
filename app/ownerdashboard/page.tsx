import React from "react";
import Image from "next/image";
import LogoImage from "@/app/assests/gym-manager.webp";
export default function page() {
  return (
    <>
      {/*  show the welcome page here  */}
      <div className="text-4xl flex justify-center items-center w-full h-full bg-black">
        <h1>Welcome to the Owner Dashboard</h1>
      </div>
    </>
  );
}
