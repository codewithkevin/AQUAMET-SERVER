import nodemailer from "nodemailer";
import dotenv from "dotenv";
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
    html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #007bff;">Welcome to AUAMATE</h2>
      <p>Below are you crendtials, this crendtials must be your secret. Use this crendtials to login anytime.</p>
      <div style="background: white; padding: 2px;">
        <h6>ID:${_id}</h6>
        <h6>NAME:${name}</h6>
        <h6>ROLE:${role}</h6>
        <h6>EMAIL:${email}</h6>
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

export default sendWelcomeMessage;
