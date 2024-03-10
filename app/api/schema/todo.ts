import { sql } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: serial("id").primaryKey(),
  todo: text("todo"),
  status: integer("status").default(0),
  createdBy: integer("createdBy"),
  createdAt: timestamp("createdAt").default(sql`now()`),
});
