import { eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";
import { hash } from "argon2";

export async function getUserById(id: string) {
  const [user] = await db.select().from(users).where(eq(users.id, id));

  return user;
}

export async function getUserByEmail(email: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  return user;
}

export async function createUser(
  displayName: string,
  email: string,
  password: string,
) {
  const hashedPassword = await hash(password);

  const [user] = await db
    .insert(users)
    .values({
      displayName,
      email,
      password: hashedPassword,
    })
    .returning();

  return user;
}

export async function createUserViaGithub(
  displayName: string,
  image: string,
  email: string,
) {
  const [user] = await db
    .insert(users)
    .values({
      displayName,
      image,
      email,
      emailVerified: new Date(),
    })
    .returning();

  return user;
}

export async function createUserViaGoogle(
  displayName: string,
  image: string,
  email: string,
) {
  const [user] = await db
    .insert(users)
    .values({
      displayName,
      image,
      email,
      emailVerified: new Date(),
    })
    .returning();

  return user;
}

export async function markUserEmailAsVerified(userId: string) {
  console.log("Marking user email as verified");

  await db
    .update(users)
    .set({ emailVerified: new Date() })
    .where(eq(users.id, userId));
}
