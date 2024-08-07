"use server";

import { createServerAction } from "zsa";
import { z } from "zod";
import { getUserByEmail } from "@/auth/repository/user";
import { generateEmailVerificationToken } from "../repository/email-verification-token";
import { sendVerificationEmail } from "@/lib/mail";
import { getAccountByUserId } from "@/auth/repository/account";
import { AccountType } from "@/db/schema";
import { verify } from "argon2";
import { setSession } from "@/auth/common/session";
import { redirect } from "next/navigation";
import { EmailAlreadyRegisteredError, LoginError } from "@/lib/errors";

export const signInAction = createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
  )
  .handler(async ({ input: { email, password } }) => {
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      throw new LoginError();
    }

    if (!existingUser.emailVerified) {
      // If token exists delete and create new one
      const emailVerificationToken = await generateEmailVerificationToken(
        existingUser.id,
      );

      // Send verification email
      await sendVerificationEmail(
        existingUser.email,
        emailVerificationToken.token,
      );

      return {
        message: "Email not verified, Please check your email",
      };
    }

    const existingAccount = await getAccountByUserId(existingUser.id);
    if (existingAccount.accountType !== AccountType.enum.credentials) {
      throw new EmailAlreadyRegisteredError();
    }

    const isPasswordValid = await verify(existingUser.password!, password);
    if (!isPasswordValid) {
      throw new LoginError();
    }

    await setSession(existingUser.id);

    return redirect("/dashboard");
  });
