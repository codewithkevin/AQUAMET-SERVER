import jwt from "jsonwebtoken";

const privateKey = process.env.JWT_PRIVATE_KEY;

function adminAuth(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  next();
}

export default adminAuth;
