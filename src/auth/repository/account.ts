import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { accounts, AccountType, Provider } from "@/db/schema";

export async function createAccount(userId: string) {
  await db.insert(accounts).values({
    userId,
    accountType: AccountType.enum.credentials,
  });
}

export async function createAccountViaGithub(
  userId: string,
  providerAccountId: string,
) {
  await db.insert(accounts).values({
    userId,
    accountType: AccountType.enum.oauth,
    provider: Provider.enum.github,
    providerAccountId: providerAccountId,
  });
}

export async function createAccountViaGoogle(
  userId: string,
  providerAccountId: string,
) {
  await db.insert(accounts).values({
    userId,
    accountType: AccountType.enum.oauth,
    provider: Provider.enum.google,
    providerAccountId: providerAccountId,
  });
}

export async function getAccountByUserId(userId: string) {
  const [account] = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, userId));

  return account;
}

export async function getAccountByGithubId(githubId: string) {
  const [account] = await db
    .select()
    .from(accounts)
    .where(
      and(
        eq(accounts.provider, Provider.enum.github),
        eq(accounts.providerAccountId, githubId),
      ),
    );

  return account;
}

export async function getAccountByGoogleId(googleId: string) {
  const [account] = await db
    .select()
    .from(accounts)
    .where(
      and(
        eq(accounts.provider, Provider.enum.google),
        eq(accounts.providerAccountId, googleId),
      ),
    );

  return account;
}
