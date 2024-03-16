import { config } from "@/app/api/config/config";
import { jwtVerify } from "jose";

export const isAuth = async (token: string) => {
  try {
    const secretKey = new TextEncoder().encode(config.JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);
    return { ...payload, success: true };
  } catch (error) {
    return { success: false };
  }
};
