import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import data from "../../data/blog.json";

export async function GET() {
  const token = cookies().get("token");

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = NextResponse.json(data);
    response.headers.set("Cache-Control", "public, max-age=3600");
    response.headers.set("Content-Type", "application/json");
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Error loading data" },
      { status: 500 }
    );
  }
}
