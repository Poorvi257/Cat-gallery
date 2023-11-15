const request = require("supertest");
const app = require("../app"); // Adjust the path as necessary
const path = require("path");
const fs = require("fs");

describe("Picture Endpoints", () => {
  let token, pictureId;

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

  it("should upload a new picture", async () => {
    console.log("Starting picture upload test");
    console.log("Token used: ", token);

    const filePath = path.join(__dirname, "../images/cat.png");
    console.log("File path: ", filePath);
    if (!fs.existsSync(filePath)) {
      throw new Error("File not found: " + filePath);
    }

    try {
      const res = await request(app)
        .post("/picture/upload")
        .set("Authorization", `Bearer ${token}`)
        .field("title", "Test Picture") // Add title field
        .attach("picture", filePath);

      console.log("Response received");
      console.log("Response : ", res.body);

      if (res.body.error) {
        console.log("Error: ", res.body.error);
      }

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("imageUrl");
      uploadedPictureId = res.body.id;
    } catch (error) {
      console.error("Error during picture upload test: ", error);
    }
  });

  // Test uploading without a file
  it("should not upload a picture without a file", async () => {
    const res = await request(app)
      .post("/picture/upload")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "No file uploaded");
  });

  // Test uploading without a title
  it("should not upload a picture without a title", async () => {
    const filePath = path.join(__dirname, "../images/cat.png");
    const res = await request(app)
      .post("/picture/upload")
      .set("Authorization", `Bearer ${token}`)
      .attach("picture", filePath);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Title is required");
  });

  it("should fetch a picture by ID", async () => {
    const res = await request(app)
      .get(`/picture/${uploadedPictureId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", uploadedPictureId);
  });

  it("should update a picture", async () => {
    const res = await request(app)
      .put(`/picture/${uploadedPictureId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Title",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Updated Title");
  });

  it("should delete a picture", async () => {
    const res = await request(app)
      .delete(`/picture/${uploadedPictureId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Picture deleted successfully");
  });

  afterAll(async () => {
    // Cleanup: Delete test user and picture
    // Implement the cleanup logic as per your application's design
  });
});
