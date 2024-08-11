import { db } from "../db.js";
import {
  InsertUser,
  InsertMessage,
  InsertFile,
  usersTable,
  messagesTable,
  filesTable,
} from "../schema.js";

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function createMessage(data: InsertMessage) {
  await db.insert(messagesTable).values(data);
}

export async function createFile(data: InsertFile) {
  await db.insert(filesTable).values(data);
}
