import { eq } from "drizzle-orm";
import { dbModule } from "../config/database";
import { user } from "../schema/user";
import { loginUserData, registerUserDataType } from "../../../lib/definations";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";

const registerUser = async (
  userData: registerUserDataType
): Promise<{ success: boolean; data?: any; error?: any }> => {
  try {
    // Check if user already exists
    const _user = await dbModule.db
      .select({ email: user.email })
      .from(user)
      .where(eq(user.email, userData.email));
    if (_user.length > 1) {
      // User with the email alredy exists
      return { success: false, error: "Account already exists" };
    }
    // Hash user password
    const salt = genSaltSync(10);
    const secPassword = hashSync(userData.password, salt);

    // Register user
    await dbModule.db.insert(user).values({
      name: userData.name,
      email: userData.email,
      password: secPassword,
    });

    // Success
    return { success: true, data: "registration complete; please login" };
  } catch (error) {
    console.log("Interval server error: ", error);
    return { success: false, error: "Interval server error" };
  }
};

const loginUser = async (
  userData: loginUserData
): Promise<{ success: boolean; data?: any; error?: any }> => {
  try {
    // Check if user already exists
    const _user = await dbModule.db
      .select({ email: user.email, password: user.password, id: user.id })
      .from(user)
      .where(eq(user.email, userData.email));
    if (_user.length < 1) {
      // User with the email doesnt exists
      return { success: false, error: "Invalid credentials" };
    }

    const _userData: any = _user[0];
    // compare password
    const _passwordCmp = compareSync(userData.password, _userData.password);
    if (!_passwordCmp) {
      // password incorrect
      return { success: false, error: "Invalid credentials" };
    }
    // Success
    return { success: true, data: _userData };
  } catch (error) {
    console.log("Interval server error: ", error);
    return { success: false, error: "Interval server error" };
  }
};

export const userService = {
  registerUser,
  loginUser,
};
