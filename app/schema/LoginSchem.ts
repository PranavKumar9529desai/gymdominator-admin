import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .max(40, { message: "Username must be at most 40 characters." }),
  password: z
    .string()
    .max(40, { message: "Username must be at most 40 characters." })
    .min(6, { message: "Password must be at least 6 characters." })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

export default LoginSchema;
