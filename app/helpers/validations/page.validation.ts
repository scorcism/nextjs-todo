import { z } from "zod";

const todoSchema = z.object({
  todo: z.string().min(2, {
    message:'Todo must contains atleast 2 characters'
  }),
  status: z.number(),
});

export const todoSchemas =  {
  todoSchema,
};