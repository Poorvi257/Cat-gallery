const path = require("path");
const { Picture } = require("../models"); // Adjust the import path as per your project structure
const multer = require("multer");

// Upload a picture
exports.upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const { title, access } = req.body;
    if (!title) {
      return res.status(400).json({ msg: "Title is required" });
    }

    const imageUrl = req.file.path;

    const newPicture = await Picture.create({
      title,
      imageUrl,
      access: access || "private", // Default to private if access is not provided
      userId: req.user.id,
    });

    return res.status(201).json(newPicture);
  } catch (error) {
    return res.status(500).json({ msg: "Error saving picture", error });
  }
};

// Fetch picture by ID
exports.fetchPictureById = async (req, res) => {
  try {
    const pictureId = parseInt(req.params.id);
    if (isNaN(pictureId)) {
      return res.status(400).json({ msg: "Invalid picture ID" });
    }

    const picture = await Picture.findOne({
      where: { id: pictureId, userId: req.user.id },
    });

    if (!picture) {
      return res.status(404).json({ msg: "Picture not found" });
    }

    return res.status(200).json(picture);
  } catch (error) {
    return res.status(500).json({ msg: "Error retrieving picture", error });
  }
};

// List all pictures for a user
exports.listAllPictures = async (req, res) => {
  try {
    const pictures = await Picture.findAll({
      where: { userId: req.user.id },
    });

    return res.status(200).json(pictures);
  } catch (error) {
    return res.status(500).json({ msg: "Error listing pictures", error });
  }
};

// Update a picture
exports.updatePicture = async (req, res) => {
  try {
    const pictureId = parseInt(req.params.id);
    if (isNaN(pictureId)) {
      return res.status(400).json({ msg: "Invalid picture ID" });
    }
    const { title, access } = req.body;

    const picture = await Picture.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!picture) {
      return res.status(404).json({ msg: "Picture not found" });
    }

    if (title) picture.title = title;
    if (access) picture.access = access;

    await picture.save();
    return res.status(200).json(picture);
  } catch (error) {
    return res.status(500).json({ msg: "Error updating picture", error });
  }
};

// Delete a picture
exports.deletePicture = async (req, res) => {
  try {
    const pictureId = parseInt(req.params.id);
    if (isNaN(pictureId)) {
      return res.status(400).json({ msg: "Invalid picture ID" });
    }
    const picture = await Picture.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!picture) {
      return res.status(404).json({ msg: "Picture not found" });
    }

    await picture.destroy();
    return res.status(200).json({ msg: "Picture deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Error deleting picture", error });
  }
};
