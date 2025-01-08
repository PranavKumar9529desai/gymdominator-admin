import { JWT } from "next-auth/jwt";

export const IsSales: (token: JWT) => boolean = (token: JWT) => {
  const role = token.role;
  if (role === "sales") {
    return true;
  } else {
    return false;
  }
};
