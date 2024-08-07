import crypto from "crypto";
import { db } from "@/db";
import { emailVerificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function generateEmailVerificationToken(userId: string) {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 5);

  const existingToken = await getEmailVerificationTokenByUserId(userId);
  if (existingToken) {
    await deleteEmailVerificationTokenById(existingToken.id);
  }

  const [newToken] = await db
    .insert(emailVerificationTokens)
    .values({
      userId,
      token,
      expiresAt,
    })
    .returning();

  return newToken;
}

export async function getEmailVerificationTokenByUserId(userId: string) {
  try {
    const [emailVerificationToken] = await db
      .select()
      .from(emailVerificationTokens)
      .where(eq(emailVerificationTokens.userId, userId));

    return emailVerificationToken;
  } catch (error) {
    return null;
  }
}

export async function getEmailVerificationTokenByToken(token: string) {
  try {
    const [emailVerificationToken] = await db
      .select()
      .from(emailVerificationTokens)
      .where(eq(emailVerificationTokens.token, token));

    return emailVerificationToken;
  } catch (error) {
    return null;
  }
}

export async function deleteEmailVerificationTokenById(id: string) {
  await db
    .delete(emailVerificationTokens)
    .where(eq(emailVerificationTokens.id, id));
}
