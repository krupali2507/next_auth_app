import dbconnection from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";

dbconnection();

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json(
      { success: true, message: "Logout successfully!" },
      { status: 200 }
    ).cookies.set("token", "", { expires: Date.now(), httpOnly: true });
  } catch (error: any) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
