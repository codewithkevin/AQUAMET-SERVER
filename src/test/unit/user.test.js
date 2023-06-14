import { User } from "../../model/Admin/auth/adminAccount.js";
import jwt from "jsonwebtoken";
import config from "config";
import mongoose from "mongoose";

const jwt_key = config.get("jwtPrivateKey");

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
