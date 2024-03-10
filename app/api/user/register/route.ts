import { NextRequest, NextResponse } from "next/server";
import { validate } from "../../helpers/validations/validate";
import { userValidation } from "../../helpers/validations/user.validation";
import { userService } from "../../services/user.service";
import { registerUserDataType } from "@/lib/definations";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    // validate req body
    const validateBody = validate(reqBody, userValidation.registerUserSchema);
    if (!validateBody.success) {
      return NextResponse.json(
        { ...validateBody },
        { status: 400 }
      );
    }

    const data: registerUserDataType | any = validateBody.data;
    
    const _register = await userService.registerUser(data);
    if (!_register.success) {
      return NextResponse.json({ ..._register }, { status: 400 });
    }
    return NextResponse.json({ ..._register }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 400 }
    );
  }
}
