import express from "express";
import userRouter from "../../../routes/Admin/adminAccount.js";

export default function (app) {
  app.use(express.json());
  app.use("/api/admin/user", userRouter);
}
