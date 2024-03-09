CREATE TABLE IF NOT EXISTS "todo" (
	"id" serial PRIMARY KEY NOT NULL,
	"todo" text,
	"status" integer DEFAULT 0
);
