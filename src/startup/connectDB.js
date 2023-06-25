import mongoose from "mongoose";
import winston from "winston";
import config from "config";
import dotenv from "dotenv";

dotenv.config();

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

export default function connectToMongoDB() {
  const db = process.env.DB_URL;

  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info(`Connected to ${db}...`));
}
