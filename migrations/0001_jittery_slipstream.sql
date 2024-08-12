ALTER TABLE "files_table" ADD COLUMN "content-type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "files_table" DROP COLUMN IF EXISTS "text";