import winston from "winston";

export default function (err, req, res, next) {
  // Log the exception
  winston.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(500).send("Something failed.");
}
