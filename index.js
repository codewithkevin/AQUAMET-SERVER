import dotenv from "dotenv";
import express from "express";
import winston from "winston";

dotenv.config();
const app = express();

// Create a new Winston logger instance
const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

//Imports StartUp
import connectToMongoDB from "./src/startup/connectDB.js";
import configureAdminRoutes from "./src/startup/routes/Admin/routes.js";
import configureLogging from "./src/startup/logging.js";

//Uses StartUp
configureLogging();
connectToMongoDB();
configureAdminRoutes(app);

const port = process.env.PORT || 4000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
