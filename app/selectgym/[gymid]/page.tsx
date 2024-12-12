import AuthTokenSubmission from "@/components/trainer/AuthTokenSubmission";
import React from "react";

export default function page({ params }: { params: { gymid: string } }) {
  console.log("gymid is ", params.gymid);
  return (
    <div>
      <AuthTokenSubmission />
    </div>
  );
}
