import express from "express";
import userAuthRoute from "../../../../routes/Users/website/userRoute.js";

export default function (app) {
  app.use(express.json());
  app.use("/api/user/account", userAuthRoute);
}
