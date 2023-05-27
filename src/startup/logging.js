import winston from "winston";
import "winston-mongodb";
import "express-async-errors";

export default function configureLogging() {
  const fileTransport = new winston.transports.File({
    filename: "uncaughtExceptions.log",
  });

  const consoleTransport = new winston.transports.Console();

  winston.exceptions.handle(fileTransport, consoleTransport);

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(
    new winston.transports.MongoDB({
      level: "info", // Log level
      db: "mongodb://localhost/vidly", // MongoDB connection URL
      options: {
        useNewUrlParser: true, // Use new URL parser
        useUnifiedTopology: true, // Use new server discovery and monitoring engine
      },
      collection: "logs", // Collection name for logs
      capped: true, // Create a capped collection (optional)
      cappedSize: 10000000, // Size of the capped collection in bytes (optional)
      cappedMax: 100, // Max number of documents in the capped collection (optional)
    })
  );
}
