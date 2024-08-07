import * as schema from "./schema";

import { env } from "@/env";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

export const client = createClient({
  url: env.TURSO_CONNECTION_URL!,
  authToken: env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client, { schema, logger: true });
