import dbconnection from "@/dbConfig/dbConnection";
import User from "@/models/user.model";
import { hashPassword } from "@/utils/hashing";
import sendEmail from "@/utils/mailsender";
import { NextRequest, NextResponse } from "next/server";

dbconnection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("🚀 ~ POST ~ reqBody:", reqBody);
    const { username, email, password } = reqBody;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { error: "User already exists with same email!" },
        { status: 400 }
      );
    }
    const hashedPass = await hashPassword(password);
    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    const newUserData = await newUser.save();
    console.log("🚀 ~ POST ~ newUserData:", newUserData);

    await sendEmail({ email, emailType: "VERIFY", userId: newUserData._id });

    return NextResponse.json(
      {
        success: true,
        messgae:
          "User registered successfully! Please check your email and verify.",
        data: newUserData,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
