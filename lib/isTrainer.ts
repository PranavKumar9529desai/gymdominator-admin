import { JWT } from "next-auth/jwt";

export const IsTrainer: (token: JWT) => boolean = (token: JWT) => {
  const role = token.role;
  console.log("token is ", token);
  if (role === "trainer") {
    return true;
  } else {
    return false;
  }
};
