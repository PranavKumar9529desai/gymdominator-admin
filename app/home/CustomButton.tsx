"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { NextRequest } from "next/server";
import { getToken, JWT } from "next-auth/jwt";
import { Rolestype } from "../types/next-auth";

export default function CustomButton( role : Rolestype ) {
  let router = useRouter();
  console.log("role from the custom button  ", role);
  let Role = role == "gymOwner" ? "owner" : "trainer";
  return (
    <>
      <button
        className="flex bg-blue-600 hover:bg-blue-700 text-white font-bold py-[7px] px-10 rounded-full sm:text-lg transition-all duration-200 ease-in-out transform hover:scale-105"
        onClick={() => {
          console.log("button is clicked");
          router.push(`${Role}dashboard`);
        }}
        disabled={!Role}
      >
        Get Started
        <ArrowRight className="ml-2 h-5 w-5" />
      </button> 
    </>
  );
}
