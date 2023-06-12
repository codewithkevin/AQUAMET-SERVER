import { User } from "../../model/Admin/auth/adminAccount.js";
import jwt from "jsonwebtoken";
import config from "config";

const jwt_key = config.get("jwtPrivateKey");

describe("User", () => {
  describe("generateAuthToken", () => {
    it("should generate a valid JWT token", () => {
      const payload = {
        _id: "testUserId",
        isAdmin: true,
        name: "John Doe",
        personalEmail: "test@example.com",
      };

      const user = new User(payload);

      const token = user.generateAuthToken();
      const decoded = jwt.verify(token, jwt_key);

      expect(decoded).toMatchObject(payload);
    });
  });
});
