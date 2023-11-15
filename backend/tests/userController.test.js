const request = require("supertest");
const app = require("../app");

// Test for the user registration endpoint
describe("User Registration", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/user/register").send({
      email: "testuser@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should not register a user with an existing email", async () => {
    const res = await request(app).post("/user/register").send({
      email: "testuser@example.com",
      password: "newPassword123",
    });
    expect(res.statusCode).toEqual(400);
  });

  it("should not register a user with invalid email", async () => {
    const res = await request(app).post("/user/register").send({
      email: "invalid-email",
      password: "password123",
    });
    expect(res.statusCode).toEqual(400);
  });

  it("should not register a user with a short password", async () => {
    const res = await request(app).post("/user/register").send({
      email: "newuser@example.com",
      password: "short",
    });
    expect(res.statusCode).toEqual(400);
  });
});

// Test for the user login endpoint

describe("User Login", () => {
  it("should login an existing user", async () => {
    const res = await request(app).post("/user/login").send({
      email: "testuser@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not login with incorrect password", async () => {
    const res = await request(app).post("/user/login").send({
      email: "testuser@example.com",
      password: "wrongPassword",
    });
    expect(res.statusCode).toEqual(401);
  });

  it("should not login a non-existent user", async () => {
    const res = await request(app).post("/user/login").send({
      email: "nonexistent@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(401);
  });
});

// Test for the user profile endpoint (protected route)
describe("Authentication Middleware", () => {
  let token;

  beforeAll(async () => {
    // Create a user and log in to get a valid token
    await request(app).post("/user/register").send({
      email: "testprofile@example.com",
      password: "password123",
    });
    const loginRes = await request(app).post("/user/login").send({
      email: "testprofile@example.com",
      password: "password123",
    });
    token = loginRes.body.token;
  });

  it("should deny access without token", async () => {
    const res = await request(app).get("/user/profile");
    expect(res.statusCode).toEqual(401);
  });

  it("should allow access with valid token", async () => {
    const res = await request(app)
      .get("/user/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    // Additional assertions to verify the response body...
  });

  it("should deny access with invalid token", async () => {
    const res = await request(app)
      .get("/user/profile")
      .set("Authorization", "Bearer invalidtoken123");
    expect(res.statusCode).toEqual(401);
  });
});
