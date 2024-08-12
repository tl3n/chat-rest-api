import { db } from "../db/db.js";
import { eq, count } from "drizzle-orm";
import { messagesTable, SelectUser, usersTable } from "../db/schema.js";

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

export async function getMessagesCount() {
  return db.select({ count: count() }).from(messagesTable);
}

export async function getMessagesPagination(limit: number, offset: number) {
  return db.select().from(messagesTable).limit(limit).offset(offset);
}