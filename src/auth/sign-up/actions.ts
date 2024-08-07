"use server";

import { createServerAction } from "zsa";
import { z } from "zod";

import { createUser, getUserByEmail } from "@/auth/repository/user";
import { createAccount } from "@/auth/repository/account";
import { generateEmailVerificationToken } from "@/auth/repository/email-verification-token";
import { sendVerificationEmail } from "@/lib/mail";
import { EmailAlreadyRegisteredError } from "@/lib/errors";

export const signUpAction = createServerAction()
  .input(
    z.object({
      displayName: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    }),
  )
  .handler(async ({ input: { displayName, email, password } }) => {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new EmailAlreadyRegisteredError();
    }

    // create new user
    const newUser = await createUser(displayName, email, password);
    await createAccount(newUser.id);

    // generate email verification token
    const emailVerificationToken = await generateEmailVerificationToken(
      newUser.id,
    );

    // send verification email to user
    await sendVerificationEmail(newUser.email, emailVerificationToken.token);

    return { message: "We sent you a verification email" };
  });
