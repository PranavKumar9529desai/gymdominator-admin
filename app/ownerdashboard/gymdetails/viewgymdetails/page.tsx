import ViewGymDetails from "./viewgymdetails";
import FetchGymDetailsSA from "@/app/ownerdashboard/gymdetails/viewgymdetails/GetGymDetails";
export default async function page({}) {
  const gymdetails = await FetchGymDetailsSA();
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
