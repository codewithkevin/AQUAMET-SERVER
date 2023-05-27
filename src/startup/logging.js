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
      level: "info",
      db: process.env.DB_URL,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      collection: "logs",
      capped: true,
      cappedSize: 10000000,
      cappedMax: 100,
    })
  );
}
