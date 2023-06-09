import nodemailer from "nodemailer";
import { User } from "../../model/Admin/auth/admin.model.js";
import Templates from "../../template/gmail/loginNotice.js";

import dotenv from "dotenv";
dotenv.config();

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

async function sendLoginAlert(email, name, location, device, time) {
  // Validate email address
  if (!isValidEmail(email)) {
    throw new Error("Invalid email address");
  }

  const mailOptions = {
    from: "AUAMATE",
    to: email,
    subject: "Confirmation Code",
    html: Templates.HTML({ name, location, device, time }),
  };

  try {
    const info = await mailTransport.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    throw new Error(error);
  }
}

function isValidEmail(email) {
  // Simple email address validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default sendLoginAlert;
