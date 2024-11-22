import { JWT } from "next-auth/jwt";

export const IsTrainer: (token: JWT) => boolean = (token: JWT) => {
  let Role = token.Role;
  console.log("token is ",token);
  if (Role === "trainer") {
    return true;
  } else {
    return false;
  }
};
