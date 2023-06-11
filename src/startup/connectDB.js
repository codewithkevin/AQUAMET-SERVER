import mongoose from "mongoose";
import winston from "winston";
import config from "config";

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

export default function connectToMongoDB() {
  const db = config.get("db");
  mongoose.connect(db).then(() => logger.info(`Connected to ${db}...`));
}
