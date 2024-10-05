CREATE TABLE IF NOT EXISTS "decks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notecard_decks" (
	"notecard_id" integer NOT NULL,
	"deck_id" integer NOT NULL,
	CONSTRAINT "notecard_decks_notecard_id_deck_id_pk" PRIMARY KEY("notecard_id","deck_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notecard_tags" (
	"notecard_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "notecard_tags_notecard_id_tag_id_pk" PRIMARY KEY("notecard_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notecards" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DROP TABLE "posts_table";--> statement-breakpoint
ALTER TABLE "users_table" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_table_email_unique";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notecard_decks" ADD CONSTRAINT "notecard_decks_notecard_id_notecards_id_fk" FOREIGN KEY ("notecard_id") REFERENCES "public"."notecards"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notecard_decks" ADD CONSTRAINT "notecard_decks_deck_id_decks_id_fk" FOREIGN KEY ("deck_id") REFERENCES "public"."decks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notecard_tags" ADD CONSTRAINT "notecard_tags_notecard_id_notecards_id_fk" FOREIGN KEY ("notecard_id") REFERENCES "public"."notecards"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notecard_tags" ADD CONSTRAINT "notecard_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notecards" ADD CONSTRAINT "notecards_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");