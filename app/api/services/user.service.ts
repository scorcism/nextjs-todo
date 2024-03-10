import { eq } from "drizzle-orm";
import { dbModule } from "../config/database";
import { user } from "../schema/user";

const registerUser = async (name: string, email: string, password: string) => {
  try {
    // Check if user already exists
    const _user = await dbModule.db
      .select()
      .from(user)
      .where(eq(user.email, email));

    console.log("_user: ", _user);

    // Hash user password
    // Register user
  } catch (error) {
    console.log("Interval server error: ", error);
    return { success: false, error: "Interval server error" };
  }
};
