import dbconnection from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";

dbconnection();

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { success: true, message: "Logout successfully!" },
      { status: 200 }
    );
    response.cookies.set("token", "", { expires: Date.now(), httpOnly: true });
    return response;
  } catch (error: any) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
