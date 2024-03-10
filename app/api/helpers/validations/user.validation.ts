import { z } from "zod";

const registerUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const loginUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const userValidation = {
  registerUserSchema,
  loginUserSchema,
};
