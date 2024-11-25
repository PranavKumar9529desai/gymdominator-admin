"use server";

import SignupSA, { UserExistsResponse, UserExistsSA } from "./SignupSA";

export async function RegisterSA(
  values: RegisterInput
): Promise<RegisterResponse> {
  const { email, password, name, role } = values;
  console.log("role from the values is this", role);

  let response: UserExistsResponse = await UserExistsSA(
    role,
    email,
    name,
    password
  );
  if (response.user !== false) {
    return { msg: response.msg, user: null };
  } else {
    let signupResponse = await SignupSA(role, name, email, password);
    return { msg: signupResponse.msg, user: signupResponse.user };
  }
}
