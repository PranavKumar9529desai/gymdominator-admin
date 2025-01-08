import { JWT } from "next-auth/jwt";

export const IsOwner : (token: JWT) => boolean = (token: JWT) => {
  const role = token.role;
  console.log("role of the token", token.Role);
  console.log("isgymowner returned this " , token.role , token.role == "owner");
  if ( role  === "owner") {
    return true;
  } else {
    return false;
  }
};
