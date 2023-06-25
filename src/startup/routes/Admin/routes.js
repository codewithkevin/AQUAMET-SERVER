import express from "express";
import adminRoute from "../../../routes/Admin/auth/admin.route.js";
import webrequestRoute from "../../../routes/Admin/webrequest.route.js";
import blogRoute from "../../../routes/Admin/blog.route.js";

export default function (app) {
  app.use(express.json());
  app.use("/api/admin/account", adminRoute);
  app.use("/api/admin/webrequest", webrequestRoute);
  app.use("/api/admin/blog", blogRoute);
}
