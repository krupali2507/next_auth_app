import dbconnection from "@/dbConfig/dbConnection";
import User from "@/models/user.model";
import { compare } from "@/utils/hashing";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

dbconnection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("🚀 ~ POST ~ reqBody:", reqBody);
    const { email, password } = reqBody;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return NextResponse.json(
        { success: false, message: "User doesn not esists!" },
        { status: 400 }
      );
    }

    const isPasswordMatch = await compare(password, userExists.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { success: false, message: "Password invalid!" },
        { status: 400 }
      );
    }

    const payload = {
      id: userExists._id,
      email: userExists.email,
    };
    const jsonWebToken = jwt.sign(payload, process.env.APP_SECRET!, {
      expiresIn: "1d",
    });

    return NextResponse.json(
      { success: true, message: "Logged in successfully!" },
      { status: 200 }
    ).cookies.set("token", jsonWebToken, { httpOnly: true });
  } catch (error: any) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
