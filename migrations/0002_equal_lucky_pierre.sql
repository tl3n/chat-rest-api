ALTER TABLE "messages_table" RENAME COLUMN "type" TO "content_type";--> statement-breakpoint
ALTER TABLE "files_table" DROP CONSTRAINT "files_table_message_id_messages_table_id_fk";
--> statement-breakpoint
ALTER TABLE "files_table" DROP COLUMN IF EXISTS "message_id";--> statement-breakpoint
ALTER TABLE "files_table" DROP COLUMN IF EXISTS "content-type";