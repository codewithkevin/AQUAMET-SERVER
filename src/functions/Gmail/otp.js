import nodemailer from "nodemailer";
import { User } from "../../model/Admin/auth/adminAccount.js";
import Templates from "../../template/gmail/confirmCode.js";

import dotenv from "dotenv";
dotenv.config();

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

async function sendConfirmationCode(email, confirmationCode) {
  // Validate email address
  if (!isValidEmail(email)) {
    throw new Error("Invalid email address");
  }

  const mailOptions = {
    from: "AUAMATE",
    to: email,
    subject: "Confirmation Code",
    html: Templates.HTML({ confirmationCode }),
  };

  try {
    const info = await mailTransport.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log(error);
  }
}

function isValidEmail(email) {
  // Simple email address validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default sendConfirmationCode;
