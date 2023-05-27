import express from "express";

const router = express.Router();

//Create Admin Account
router.post("/create");

//Login Admin Account
router.post("/login");

export default router;
