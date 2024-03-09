import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: serial("id").primaryKey(),
  todo: text("todo"),
  status: integer("status").default(0),
});
