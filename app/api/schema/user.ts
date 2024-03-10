import { relations, sql } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { todo } from "./todo";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }),
  email: varchar("email", { length: 100 }),
  password: varchar("password", { length: 255 }),
  createdAt: timestamp("createdAt").default(sql`now()`),
});

export const userTodoRelations = relations(user, ({ many }) => ({
  todo: many(todo),
}));