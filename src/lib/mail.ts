import { Resend } from "resend";

import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);
const domain = env.APP_URL;

export async function sendVerificationEmail(email: string, token: string) {
  const confimLink = `${domain}/email-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confimLink}">here</a> to confirm your email</p>`,
  });
}
