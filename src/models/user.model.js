import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    forgetPasswordToken: {
      type: String,
    },
    forgetPasswordTokenExpiry: {
      type: Date,
    },
    verifyToken: {
      type: String,
    },
    verifyTokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
