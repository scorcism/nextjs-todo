import { NextResponse } from "next/server";
import { validate } from "../helpers/validations/validate";
import { addTodoSchema } from "../helpers/validations/home.validations";
import { homeService } from "../services/home.service";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    // validate req body
    const validateBody = validate(reqBody, addTodoSchema);
    if (!validateBody.success) {
      return NextResponse.json({ ...validateBody });
    }
    let res = await homeService.addTodo(
      validateBody.data?.todo,
      validateBody.data?.status
    );
    if (!res.success) {
      revalidatePath('/home')
      return NextResponse.json({ ...res }, { status: 400 });
    }
    return NextResponse.json({ ...res }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const res = await homeService.todoList();
    return NextResponse.json({ ...res }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 400 }
    );
  }
}
