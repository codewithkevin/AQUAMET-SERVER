import request from "supertest";
import server from "../../../../index.js";
import { User } from "../../../model/Admin/auth/adminAccount.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

beforeEach(async () => {
  // Clean up the database before each test
  await User.deleteMany({});
});

describe("POST /api/admin/account", () => {
  const accountEmail = process.env.EMAIL;

  const validAdminData = {
    name: "John Doe",
    email: accountEmail,
    password: "Password123",
    role: process.env.ADMIN_ROLE1,
    personalEmail: process.env.ADMIN_USER1,
  };

  it("should create a new admin account with valid data", async () => {
    const res = await request(server)
      .post("/api/admin/account/create")
      .send(validAdminData);

    expect(res.status).toBe(200);
    expect(res.body.result).toHaveProperty("name", validAdminData.name);
    expect(res.body.result).toHaveProperty("email", validAdminData.email);
    expect(res.body.result).toHaveProperty("role", validAdminData.role);
    expect(res.body.result).toHaveProperty(
      "personalEmail",
      validAdminData.personalEmail
    );
    expect(res.body.result).toHaveProperty("_id");
    expect(res.body).toHaveProperty("token");
  });

  it("should not create an admin account with an invalid email", async () => {
    const invalidAdminData = {
      ...validAdminData,
      email: "invalid@example.com",
    };

    const res = await request(server)
      .post("/api/admin/account/create")
      .send(invalidAdminData);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      "message",
      "Email not recognized by company"
    );
  });

  // Add more test cases as needed
});
