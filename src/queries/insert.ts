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
  await db.insert(usersTable).values(data);
}

export async function createMessage(data: InsertMessage) {
  await db.insert(messagesTable).values(data);
}

export async function createFile(userId: number, data: InsertFile) {
  const fileId = (await db
    .insert(filesTable)
    .values(data)
    .returning({ insertedId: filesTable.id }))[0].insertedId;
  createMessage({ type: "file", userId, fileId });
}
