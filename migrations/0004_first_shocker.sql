ALTER TABLE "messages_table" RENAME COLUMN "content_type" TO "type";--> statement-breakpoint
ALTER TABLE "files_table" ADD COLUMN "content_type" text NOT NULL;