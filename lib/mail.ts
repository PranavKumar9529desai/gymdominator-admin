"use server";
import { EmailTemplate } from "@/components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export async function sendVerificationEmail(to: string, firstName: string) {
  try {
    const { data,  } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "fullstackwebdeveloper123@gmail.com",
      subject: "Verify your email",
      react: EmailTemplate({ firstName: firstName , verificationCode: "1234" }),
    });
    console.log("data friom resend verifaication request", data);
    return data;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return error;
  }
}
