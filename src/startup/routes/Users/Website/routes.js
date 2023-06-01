import express from "express";
import userAuthRoute from "../../../../routes/Users/website/userRoute.js";
import demoRoute from "../../../../routes/Users/website/demo.js";

export default function (app) {
  app.use(express.json());
  app.use("/api/user/account", userAuthRoute);
  app.use("/api/user/demo", demoRoute);
}
