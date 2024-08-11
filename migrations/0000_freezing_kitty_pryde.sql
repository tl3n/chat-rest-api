CREATE TABLE IF NOT EXISTS "files_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"message_id" integer NOT NULL,
	"name" text NOT NULL,
	"text" text NOT NULL,
	"size" integer NOT NULL,
	"path" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"sent_at" timestamp DEFAULT now() NOT NULL,
	"type" text NOT NULL,
	"content" text,
	"file_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_table_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "files_table" ADD CONSTRAINT "files_table_message_id_messages_table_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."messages_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages_table" ADD CONSTRAINT "messages_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages_table" ADD CONSTRAINT "messages_table_file_id_files_table_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."files_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
