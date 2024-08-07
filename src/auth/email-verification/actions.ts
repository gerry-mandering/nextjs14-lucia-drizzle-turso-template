"use server";

import { createServerAction } from "zsa";
import { z } from "zod";

import {
  deleteEmailVerificationTokenById,
  getEmailVerificationTokenByToken,
} from "@/auth/repository/email-verification-token";
import { getUserById, markUserEmailAsVerified } from "@/auth/repository/user";
import {
  InvalidTokenError,
  TokenExpiredError,
  UserNotFoundError,
} from "@/lib/errors";

export const verifyEmailAction = createServerAction()
  .input(
    z.object({
      token: z.string(),
    }),
  )
  .handler(async ({ input: { token } }) => {
    const existingToken = await getEmailVerificationTokenByToken(token);
    if (!existingToken) {
      throw new InvalidTokenError();
    }

    const hasExpired = new Date(existingToken.expiresAt) < new Date();
    if (hasExpired) {
      throw new TokenExpiredError();
    }

    const existingUser = await getUserById(existingToken.userId);
    if (!existingUser) {
      throw new UserNotFoundError();
    }

    await markUserEmailAsVerified(existingUser.id);
    await deleteEmailVerificationTokenById(existingToken.id);

    return { message: "Email verified" };
  });
