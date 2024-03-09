import { z } from "zod";

export const addTodoSchema = z.object({
  todo: z.string().min(2),
  status: z.number(),
});
