import axios from "axios";
import React from "react";
// TODO : add extra layer of protection to the this allusers endpoint and put the jwt in the end
export default async function FetchUser() {
  console.log("the fetchUser is called "+`${process.env.BACKEND_URL}/api/v1/user/allusers`);
  let resposne = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/allusers`,
    {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3R0b2tlbiI6InNoaXZhbTEyQGdtYWlsLmNvbSJ9.IYh9iHxEo0K7vyvfVopHO_pOzWgJ91XItNpVO1ekDkk",
      },
    }
  );
  // console.log("this the response", resposne.data);
  let data : FetchUserType = await resposne.data;
  return data.data;
}
