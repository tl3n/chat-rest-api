import { db } from "../db/db.js";
import { eq, count } from "drizzle-orm";
import { messagesTable, filesTable, SelectUser, SelectMessage, SelectFile, usersTable } from "../db/schema.js";

export async function getUserByUsername(username: SelectUser["username"]) {
  return (await db.select().from(usersTable).where(eq(usersTable.username, username)))[0];
}

export async function getMessagesCount() {
  return db.select({ count: count() }).from(messagesTable);
}

export async function getMessagesPagination(limit: number, offset: number) {
  return db.select().from(messagesTable).limit(limit).offset(offset);
}

export async function getMessageById(id: SelectMessage["id"]) {
  return db.select().from(messagesTable).where(eq(messagesTable.id, id));
}

export async function getFileById(id: SelectFile["id"]) {
  return db.select().from(filesTable).where(eq(filesTable.id, id));
}