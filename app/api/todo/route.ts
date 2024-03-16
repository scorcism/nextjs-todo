import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { addTodoSchema } from "../helpers/validations/home.validations";
import { validate } from "../helpers/validations/validate";
import { homeService } from "../services/todo.service";
import { CustomRequest } from "@/middleware";
import { cookies } from "next/headers";
import { isAuth } from "@/lib/isAuth";

export const POST = async (req: CustomRequest) => {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("AUTH_TOKEN");

    const userData = await isAuth(authToken?.value);

    console.log(userData);
    // Get the user data from middleware

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
      revalidatePath("/home");
      return NextResponse.json({ ...res }, { status: 400 });
    }
    return NextResponse.json({ ...res }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 400 }
    );
  }
};

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

export async function PUT(req: Request) {
  try {
    const reqBody = await req.json();
    const { id, status } = reqBody;
    const res = await homeService.updateTodoStatus(status, id);
    return NextResponse.json({ ...res }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = Number(searchParams.get("id"));
    const res = await homeService.deleteTodo(id);
    return NextResponse.json({ ...res }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 400 }
    );
  }
}
