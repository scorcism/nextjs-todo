import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("this is login route");
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 400 }
    );
  }
}
