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
  const mailOptions = {
    from: "AUAMATE",
    to: email,
    subject: "Welcome to AUAMATE, Account Created Successfully",
    html: Templates.HTML({ email, name, role, _id }),
  };

  mailTransport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export default sendWelcomeMessage;
