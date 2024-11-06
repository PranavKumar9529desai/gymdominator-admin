import { JWT } from "next-auth/jwt";

export const IsSales: (token: JWT) => boolean = (token: JWT) => {
  let Role = token.role;
  if (Role === "SALES") {
    return true;
  } else {
    return false;
  }
};
