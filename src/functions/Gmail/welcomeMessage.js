import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Templates from "../../template/gmail/welcome.js";
dotenv.config();

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

async function sendWelcomeMessage(email, name, role, _id) {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: "AUAMATE",
      to: email,
      subject: "Welcome to AUAMATE",
      html: Templates.HTML({ email, name, role, _id }),
    };

    mailTransport.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

export default sendWelcomeMessage;
