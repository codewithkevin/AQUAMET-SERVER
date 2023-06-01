import nodemailer from "nodemailer";
import { User } from "../../model/Admin/auth/adminAccount.js";
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
  const mailOptions = {
    from: "AUAMATE",
    to: email,
    subject: "Confirmation Code",
    html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #007bff;">Welcome to AUAMATE</h2>
      <div style="background: white; padding: 2px;">
        <p>Your confirmation code is <strong>${confirmationCode}</strong>.</p>
        <img src="https://aquamet-website.vercel.app/static/media/Mockup.90a6b762c04e10ceef6f.png" alt="Company Logo" style="max-width: 700px; ">
      </div>
    </div>
    `,
  };

  mailTransport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export default sendConfirmationCode;
