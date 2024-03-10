import { loginUserData } from "@/lib/definations";
import { NextRequest, NextResponse } from "next/server";
import { userValidation } from "../../helpers/validations/user.validation";
import { validate } from "../../helpers/validations/validate";
import { userService } from "../../services/user.service";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    // validate req body
    const validateBody = validate(reqBody, userValidation.loginUserSchema);
    if (!validateBody.success) {
      return NextResponse.json({ ...validateBody }, { status: 400 });
    }
    const data: loginUserData | any = validateBody.data;
    const _login = await userService.loginUser(data);
    if (!_login.success) {
      return NextResponse.json({ ..._login }, { status: 400 });
    }
    // User login success
    const _userData = _login.data;
    
    cookies().set({
      name: "AUTH_TOKEN",
      value: "",
      httpOnly: true,
      path: "/",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 400 }
    );
  }
}
