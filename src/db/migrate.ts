import "dotenv/config";

import { migrate } from "drizzle-orm/libsql/migrator";
import { db, client } from "./index";

(async () => {
  await migrate(db, { migrationsFolder: "./src/db/migrations" });
  client.close();
})();
