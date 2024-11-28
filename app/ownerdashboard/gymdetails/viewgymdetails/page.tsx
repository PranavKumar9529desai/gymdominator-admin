import ViewGymDetails from "@/components/gym-owner/viewgymdetails";
import React from "react";
import FetchGymDetailsSA from "@/app/actions/gym/FetchGymDetailsSA";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";
export default async function page({
  searchParams,
}: {
  searchParams: { gymid: string };
}) {
  revalidatePath("/ownerdashboard/gymdetails");
  let gymid = searchParams.gymid;
  console.log("gymid is ", gymid);
  let gymdetails = await FetchGymDetailsSA(gymid);
  if (!gymdetails) {
    return <>Loading plz wait</>;
  } else {
    return (
      <>
        <div>
          <ViewGymDetails gymDetails={gymdetails} />
        </div>
      </>
    );
  }
}
