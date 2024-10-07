import Button from "@/components/button";
import Link from "next/link";
import FetchUser from "./utils/FetchUser";

export default async function page() {
  const response: User[] = await FetchUser();
  console.log(response);
  return (
    <div className="flex h-screen w-screen justify-center items-center flex-col gap-4 ">
      {response.map((user) => {
        return (
          <>
            <div className="w-[200px] py-4 px-2 bg-slate-200 *:text-blue-600 font-serif  text-center  flex flex-col ">
              <div>Name of the user is {user.name}</div>
              <div>Weigth of the user is : {user?.HealthProfile?.weight || "no weight is given"}</div>
              <div>Height of the user is {user?.HealthProfile?.height || "no height is given"}</div>
            </div>
          </>
        );
      })}
      <Button />
    </div>
  );
}
