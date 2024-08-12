import {
  AnyPgColumn,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  username: text("name").notNull().unique(),
  password: text("password").notNull(),
});

export const messagesTable = pgTable("messages_table", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  sentAt: timestamp("sent_at").notNull().defaultNow(),
  type: text("type").notNull(),
  content: text("content"),
  fileId: integer("file_id").references((): AnyPgColumn => filesTable.id),
});

export const filesTable = pgTable("files_table", {
  id: serial("id").primaryKey(),
  messageId: integer("message_id")
    .notNull()
    .references(() => messagesTable.id),
  name: text("name").notNull(),
  contentType: text("content-type").notNull(),
  size: integer("size").notNull(),
  path: text("path").notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertMessage = typeof messagesTable.$inferInsert;
export type SelectMessage = typeof messagesTable.$inferSelect;

export type InsertFile = typeof filesTable.$inferInsert;
export type SelectFile = typeof filesTable.$inferSelect;
