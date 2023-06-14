import dotenv from "dotenv";
dotenv.config();

export default function checkJwtPrivateKey() {
  const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

  if (!jwtPrivateKey) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
}
