import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export const validate = (
  body: any,
  schema: any
): { success: boolean; error?: any; data?: any } => {
  const validateResult = schema.safeParse(body);
  if (!validateResult.success) {
    return {
      success: false,
      error: fromZodError(validateResult.error).details,
    };
  }
  return { success: true, data: validateResult.data };
};
