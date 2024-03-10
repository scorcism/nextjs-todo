CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200),
	"email" varchar(100),
	"password" varchar(255),
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "todo" ADD COLUMN "createdBy" integer;--> statement-breakpoint
ALTER TABLE "todo" ADD COLUMN "createdAt" timestamp DEFAULT now();