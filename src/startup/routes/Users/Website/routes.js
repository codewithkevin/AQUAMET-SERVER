import express from "express";
import userAuthRoute from "../../../../routes/Users/website/userRoute.js";
import request from "../../../../routes/Users/website/requests.js";

export default function (app) {
  app.use(express.json());
  app.use("/api/user/account", userAuthRoute);
  app.use("/api/user/request", request);
}
