import { db } from "../db/db.js";
import {
  InsertUser,
  InsertMessage,
  InsertFile,
  usersTable,
  messagesTable,
  filesTable,
} from "../db/schema.js";

export async function createUser(data: InsertUser) {
  return (await db.insert(usersTable).values(data).returning())[0];
}

export async function createMessage(data: InsertMessage) {
  return (await db.insert(messagesTable).values(data).returning())[0];
}

export async function createFile(userId: number, data: InsertFile) {
  const file = (await db.insert(filesTable).values(data).returning())[0];

  const fileId = file.id;
  createMessage({ type: "file", userId, fileId });

  return file;
}
