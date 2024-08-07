"use server";

import { createServerAction } from "zsa";
import { z } from "zod";
import {
  deleteEmailVerificationTokenById,
  getEmailVerificationTokenByToken,
} from "@/auth/repository/email-verification-token";
import { getUserById, markUserEmailAsVerified } from "@/auth/repository/user";

export const verifyEmailAction = createServerAction()
  .input(
    z.object({
      token: z.string(),
    }),
  )
  .handler(async ({ input: { token } }) => {
    const existingToken = await getEmailVerificationTokenByToken(token);
    if (!existingToken) {
      throw new Error("Invalid token");
    }

    console.log(existingToken);

    const hasExpired = new Date(existingToken.expiresAt) < new Date();
    if (hasExpired) {
      throw new Error("Token has expired, Please login again");
    }

    const existingUser = await getUserById(existingToken.userId);
    if (!existingUser) {
      throw new Error("User not found");
    }

    await markUserEmailAsVerified(existingUser.id);
    await deleteEmailVerificationTokenById(existingToken.id);

    return { message: "Email verified" };
  });
