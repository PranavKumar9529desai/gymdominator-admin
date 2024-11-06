import { JWT } from "next-auth/jwt";

export const IsTrainer: (token: JWT) => boolean = (token: JWT) => {
  let Role = token.role;
  console.log("token is ",token);
  if (Role === "TRAINER") {
    return true;
  } else {
    return false;
  }
};
