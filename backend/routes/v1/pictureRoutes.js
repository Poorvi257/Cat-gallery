// pictureRoutes.js
// This module defines routes for picture management in the application.
// It uses Express Router to define endpoints for uploading, fetching, listing,
// updating, and deleting pictures.

const express = require("express");
const router = express.Router();
const pictureController = require("../../controllers/pictureController");
const authMiddleware = require("../../middleware/authMiddleware");
const upload = require("../../utils/multerConfig");

// Route to upload a new picture. Requires authentication and uses multer for file upload.
router.post("/upload", authMiddleware, upload, pictureController.upload);

// Route to fetch a picture by its ID. Requires authentication.
router.get("/:id", authMiddleware, pictureController.fetchPictureById);

// Route to list all pictures of the authenticated user.
router.get("/", authMiddleware, pictureController.listAllPictures);

// Route to update a picture's details by ID. Requires authentication and multer for file upload.
router.put("/:id", authMiddleware, upload, pictureController.updatePicture);

// Route to delete a picture by its ID. Requires authentication.
router.delete("/:id", authMiddleware, pictureController.deletePicture);

module.exports = router;
