const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  // Function to handle user registration
  async register(req, res) {
    try {
      const { email, password } = req.body;

      // Validate email and password presence
      if (!email || !password) {
        return res
          .status(400)
          .send({ message: "Email and password are required" });
      }

      // Check if the user email is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).send({ message: "Invalid email format" });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).send({ message: "User already exists" });
      }

      // Check if the password is too short (e.g., minimum length requirement)
      if (password.length < 8) {
        return res.status(400).send({ message: "Password is too short" });
      }

      // Create a new user
      const newUser = await User.create({ email, password });

      // Create and send the token
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(201).send({ user: newUser, token });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  // Function to handle user login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find the user
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).send({ message: "Authentication failed" });
      }

      // Check the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send({ message: "Authentication failed" });
      }

      // Create and send the token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).send({ user, token });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  // Function to retrieve user profile
  async getProfile(req, res) {
    try {
      // req.user is set by the authMiddleware
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Get Profile Error:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};

module.exports = authController;
