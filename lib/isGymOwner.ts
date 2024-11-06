import { getToken, JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const IsGymOwner: (token: JWT) => boolean = (token: JWT) => {
  let Role = token.role;
  if (Role === "GYMOWNER") {
    return true;
  } else {
    return false;
  }
};
