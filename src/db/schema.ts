import { sql } from "drizzle-orm";
import { integer, text, sqliteTableCreator } from "drizzle-orm/sqlite-core";
import { z } from "zod";

export const roleEnum = ["user", "admin"] as const;
export const accountTypeEnum = ["credentials", "email", "oauth"] as const;
export const providerEnum = ["google", "github"] as const;

const sqliteTable = sqliteTableCreator(name => `app_${name}`);

export const users = sqliteTable("users", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  displayName: text("display_name").notNull(),
  image: text("image"),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "timestamp" }),
  password: text("password"),
  role: text("role", { enum: roleEnum }).notNull().default("user"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const accounts = sqliteTable("accounts", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  accountType: text("account_type", { enum: accountTypeEnum }).notNull(),
  provider: text("provider", { enum: providerEnum }),
  providerAccountId: text("provider_account_id"),
});

export const emailVerificationTokens = sqliteTable(
  "email_verification_tokens",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .unique()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    token: text("token").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  },
);

export const sessions = sqliteTable("sessions", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  expiresAt: integer("expires_at").notNull(),
});

export const accountType = z.enum(accountTypeEnum);
export const provider = z.enum(providerEnum);
