import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import data from "../../data/blog.json";

 
export async function GET() {
  const token = cookies().get("token");

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error loading data" },
      { status: 500 }
    );
  }
}
