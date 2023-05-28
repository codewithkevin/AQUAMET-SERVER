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

//Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Imports StartUp
import connectToMongoDB from "./src/startup/connectDB.js";
import configureLogging from "./src/startup/logging.js";
import configureAdminRoutes from "./src/startup/routes/Admin/routes.js";

//Uses StartUp
connectToMongoDB();
configureLogging();
configureAdminRoutes(app);

const port = process.env.PORT || 4000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
