import { drizzle } from "drizzle-orm/node-postgres";
//import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

// used with neon
//const sql = neon(process.env.DATABASE_URL!);

export const client = new pg.Client({
  connectionString: process.env.DATABASE_URL!
});

await client.connect();

export const db = drizzle(client);
