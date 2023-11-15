const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  async register(req, res) {
    try {
      const { email, password } = req.body;

      // Validate email and password
      if (!email || !password) {
        return res.status(400).send("Email and password are required");
      }

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).send("User already exists");
      }

      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await User.create({ email, password: hashedPassword });

      // Create and send the token
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(201).send({ user: newUser, token });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find the user
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).send("Authentication failed");
      }

      // Check the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send("Authentication failed");
      }

      // Create and send the token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).send({ user, token });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).send(error.message);
    }
  },

  async getProfile(req, res) {
    try {
      // req.user is set by the authMiddleware
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Get Profile Error:", error);
      res.status(500).send(error.message);
    }
  },
};

module.exports = authController;
