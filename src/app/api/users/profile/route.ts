import dbconnection from "@/dbConfig/dbConnection";
import User from "@/models/user.model";
import { compare } from "@/utils/hashing";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/utils/getDataFromToken";

dbconnection();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const userData = await User.findById({ _id: userId }).select("-password");

    if (!userData) throw new Error("Invalid User token!");
    console.log("🚀 ~ POST ~ userData:", userData);

    return NextResponse.json(
      {
        success: true,
        message: "Profile Data fetched successfully!",
        data: userData,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
