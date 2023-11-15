// userRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const authMiddleware = require("../../middleware/authMiddleware");

// User registration
router.post("/register", authController.register);

// User login
router.post("/login", authController.login);

// Get user profile, protected route
router.get("/profile", authMiddleware, authController.getProfile);

// Exporting the router
module.exports = router;
