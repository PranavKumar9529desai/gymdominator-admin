import ViewGymDetails from "@/components/gym-owner/viewgymdetails";
import FetchGymDetailsSA  from "@/app/actions/gym/owner/GetGymDetails";
import { auth } from "@/auth";
import { OwnerReqConfig } from "@/lib/AxiosInstance/ownerAxios";
import GymDetails from "@/components/gym-owner/EditGymDetails";
export default async function page({
}) {
  // use session then then passdown it to the fetch gym details
  
  const ownerAxios = await OwnerReqConfig();
  console.log("ownerAxios from the view gym details page is ", ownerAxios);
  const  gymdetails = await FetchGymDetailsSA();
  if (!gymdetails) {
    return <>Loading plz wait</>;
  } else {
    return (
      <>
        <div>
          <ViewGymDetails  gymDetails={gymdetails} />
        </div>
      </>
    );
  }
}
