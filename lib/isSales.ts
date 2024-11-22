import { JWT } from "next-auth/jwt";

export const IsSales: (token: JWT) => boolean = (token: JWT) => {
  let Role = token.Role;
  if (Role === "sales") {
    return true;
  } else {
    return false;
  }
};
