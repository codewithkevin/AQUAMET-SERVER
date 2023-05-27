import mongoose from "mongoose";
import winston from "winston";

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

export default function connectToMongoDB() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => logger.info("Connected to MongoDB..."));
}
