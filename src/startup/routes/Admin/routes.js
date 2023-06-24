import express from "express";
import adminRoute from "../../../routes/Admin/auth/admin.route.js";

export default function (app) {
  app.use(express.json());
  app.use("/api/admin/account", adminRoute);
}
