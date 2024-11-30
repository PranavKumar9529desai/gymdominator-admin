import ViewGymDetails from "@/components/gym-owner/viewgymdetails";
import FetchGymDetailsSA, { sessionType } from "@/app/actions/gym/FetchGymDetailsSA";
import { auth } from "@/auth";
export default async function page({
  searchParams,
}: {
  searchParams: { gymid: string };
}) {
  let gymid = searchParams.gymid;
  // use session then then passdown it to the fetch gym details
  let session = await auth();
  console.log("session fron the view gym details page is ", session);
  if (!session) {
    return <>Loading plz wait</>;
  }
  let gymdetails = await FetchGymDetailsSA({gymid , session : session as sessionType});
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
