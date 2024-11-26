import { getToken, JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const IsGymOwner: (token: JWT) => boolean = (token: JWT) => {
  let role = token.role;
  console.log("role of the token", token.Role);
  console.log("isgymonwer returned this " , token.role , token.role == "gymOwner");
  if ( role  === "gymOwner") {
    return true;
  } else {
    return false;
  }
};
