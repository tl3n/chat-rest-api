import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, client } from "./db.js"

await migrate(db, { migrationsFolder: "migrations"});

await client.end();