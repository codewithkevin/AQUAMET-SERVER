import dotenv from "dotenv";
import express from "express";
import winston from "winston";
import config from "config";

dotenv.config();
const app = express();
app.use(cors());

// Create a new Winston logger instance
const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

//Imports StartUp
import connectToMongoDB from "./src/startup/connectDB.js";
import configureAdminRoutes from "./src/startup/routes/Admin/routes.js";
import configureLogging from "./src/startup/logging.js";
import configureWebsiteRoutes from "./src/startup/routes/Users/Website/routes.js";
import configureViewEngine from "./src/startup/config.js";
import prod from "./src/startup/prod.js";

//Uses StartUp
configureLogging();
configureAdminRoutes(app);
configureWebsiteRoutes(app);
connectToMongoDB();
configureViewEngine();
prod(app);

const port = process.env.PORT || 4000;
const server = app.listen(port, () =>
  logger.info(`Listening on port ${port}...`)
);

export default server;
