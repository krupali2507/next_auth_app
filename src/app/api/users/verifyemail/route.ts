import dbconnection from "@/dbConfig/dbConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

dbconnection();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { token } = reqbody;
    const userExistToVerify = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!userExistToVerify) {
      return NextResponse.json(
        { success: false, message: "Invalid User!" },
        { status: 400 }
      );
    }

    userExistToVerify.isVerified = true;
    userExistToVerify.verifyToken = undefined;
    userExistToVerify.verifyTokenExpiry = undefined;

    await userExistToVerify.save();
    return NextResponse.json(
      { success: true, message: "User verified successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
