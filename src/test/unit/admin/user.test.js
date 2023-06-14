import { User } from "../../../model/Admin/auth/adminAccount.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const jwt_key = process.env.JWT_PRIVATE_KEY;

describe("User", () => {
  describe("generateAuthToken", () => {
    it("should generate a valid JWT token", () => {
      const payload = {
        _id: new mongoose.Types.ObjectId().toHexString(),
        isAdmin: true,
      };

      const user = new User(payload);

      const token = user.generateAuthToken();
      const decoded = jwt.verify(token, jwt_key);

      expect(decoded).toMatchObject(payload);
    });
  });
});
