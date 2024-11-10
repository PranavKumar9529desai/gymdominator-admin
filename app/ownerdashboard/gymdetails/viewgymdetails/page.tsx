import ViewGymDetails from "@/components/gym-owner/viewgymdetails";
import React from "react";
import FetchGymDetailsSA from "@/app/actions/FetchGymDetailsSA";
export default async function page({
  searchParams,
}: {
  searchParams: { gymid: string };
}) {
  let gymid = searchParams.gymid;
  console.log("gymid is ", gymid);
  let gymdetails = await FetchGymDetailsSA(gymid);
  console.log("gym details are ", gymdetails);
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
