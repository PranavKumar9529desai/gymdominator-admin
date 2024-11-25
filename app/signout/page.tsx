"use client";
import { signOut } from "@/auth";
import Signout from "@/components/Signout";
import { Button } from "@/components/ui/button";
import React from "react";

export default function page() {
  return (
    <>
      <Signout />
    </>
  );
}
