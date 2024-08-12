import { db } from "../db.js";
import { eq } from "drizzle-orm";
import { SelectUser, usersTable } from "../schema.js";

export async function getUserByUsername(
  username: SelectUser["username"]
): Promise<
  Array<{
    id: number;
    username: string;
    password: string;
  }>
> {
  return db.select().from(usersTable).where(eq(usersTable.username, username));
}
