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
  const mailOptions = {
    from: "AUAMATE",
    to: email,
    subject: "Confirmation Code",
    html: Templates.HTML({ confirmationCode }),
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
