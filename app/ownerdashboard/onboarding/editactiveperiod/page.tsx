"use client";
import { UserValidityPeriod } from "@/app/ownerdashboard/onboarding/editactiveperiod/UserValidPeriod";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const userid = searchParams.get("userid") || "";
  const username = searchParams.get("username") || "";
  const startdate = searchParams.get("startdate");
  const enddate = searchParams.get("enddate");

  return (
    <div className="container flex justify-center lg:h-screen py-10">
      <UserValidityPeriod
        userId={userid}
        userName={username}
        userImage="https://randomuser.me/api/portraits"
        initialStartDate={startdate ? new Date(startdate) : undefined}
        initialEndDate={enddate ? new Date(enddate) : undefined}
      />
    </div>
  );
}
