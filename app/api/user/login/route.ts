import { loginUserData } from "../../../../lib/definations";
import { NextRequest, NextResponse } from "next/server";
import { userValidation } from "../../helpers/validations/user.validation";
import { validate } from "../../helpers/validations/validate";
import { userService } from "../../services/user.service";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { config } from "../../config/config";
const { JWT_SECRET } = config;

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
    const secretKey = new TextEncoder().encode(config.JWT_SECRET);

    // get the user id, use jwt
    const token = await new SignJWT({ id: _userData.id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1 day")
      .sign(secretKey);

    console.log("token: ", token);
    cookies().set({
      name: "AUTH_TOKEN",
      value: token,
      httpOnly: true,
      path: "/",
    });
    return NextResponse.json(
      { success: true, message: "login successfull" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Login error: ", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 400 }
    );
  }
}
