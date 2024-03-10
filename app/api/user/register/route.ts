import { NextRequest, NextResponse } from "next/server";
import { validate } from "../../helpers/validations/validate";
import { userValidation } from "../../helpers/validations/user.validation";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    // validate req body
    const validateBody = validate(reqBody, userValidation.registerUserSchema);
    if (!validateBody.success) {
      return NextResponse.json({ ...validateBody });
    }

    const data = validateBody;
    


  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 400 }
    );
  }
}
