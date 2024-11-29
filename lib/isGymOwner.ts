import { getToken, JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const IsOwner : (token: JWT) => boolean = (token: JWT) => {
  let role = token.role;
  console.log("role of the token", token.Role);
  console.log("isgymowner returned this " , token.role , token.role == "owner");
  if ( role  === "owner") {
    return true;
  } else {
    return false;
  }
};
