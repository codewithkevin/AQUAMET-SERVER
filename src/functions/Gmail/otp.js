import nodemailer from "nodemailer";
import { User } from "../../model/Admin/auth/adminAccount.js";

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "oseikelvin709@gmail.com",
    pass: "cawdccuvjzjdkhck",
  },
});

async function sendConfirmationCode(email, confirmationCode) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  user.confirmationCode = confirmationCode;
  await user.save();

  const mailOptions = {
    from: "Quiz App",
    to: email,
    subject: "AQUAMATE",
    text: `Your confirmation code is ${confirmationCode}.`,
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
