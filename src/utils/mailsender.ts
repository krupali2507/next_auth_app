import User from "@/models/user.model";
import nodemailer from "nodemailer";
import { hashToken } from "@/utils/hashing";

const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await hashToken(userId);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "api",
        pass: "b96a45c52086692c41376e15720ce588",
      },
    });

    const verifyLink = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;

    const mailOptions = {
      from: "pratipalrao619@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify Your account" : "Reset Your Password", // Subject line
      html: `<p>Click <a href=${verifyLink}>here</a> to ${
        emailType === "VERIFY" ? "verify your emai" : "reste your password"
      } or copy paste the link below in your browser.
      <br/>
      ${verifyLink}
      </p>`, // html body
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default sendEmail;
