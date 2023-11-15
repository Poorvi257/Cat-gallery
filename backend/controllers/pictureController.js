const path = require("path");
const { Picture } = require("../models"); // Adjust the import path as per your project structure
const multer = require("multer");

// Utility function to validate picture ID
function isValidPictureId(id) {
  const pictureId = parseInt(id);
  return !isNaN(pictureId) && pictureId > 0;
}

// Upload a picture
// Endpoint: POST /upload
// Requires a file upload and title in the request.
// Access can be specified, defaults to 'private'.
exports.upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const { title, access } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const imageUrl = req.file.path;
    const newPicture = await Picture.create({
      title,
      imageUrl,
      access: access || "private",
      userId: req.user.id,
    });
    return res.status(201).json(newPicture);
  } catch (error) {
    return res.status(500).json({ message: "Error saving picture", error });
  }
};

// Fetch picture by ID
// Endpoint: GET /:id
// Requires the picture ID as a URL parameter.
exports.fetchPictureById = async (req, res) => {
  try {
    if (!isValidPictureId(req.params.id)) {
      return res.status(400).json({ message: "Invalid picture ID" });
    }
    const picture = await Picture.findOne({
      where: { id: parseInt(req.params.id), userId: req.user.id },
    });
    if (!picture) {
      return res.status(404).json({ message: "Picture not found" });
    }
    return res.status(200).json(picture);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving picture", error });
  }
};

// List all pictures for a user
// Endpoint: GET /
// Lists all pictures uploaded by the authenticated user.
exports.listAllPictures = async (req, res) => {
  try {
    const pictures = await Picture.findAll({
      where: { userId: req.user.id },
    });
    return res.status(200).json(pictures);
  } catch (error) {
    return res.status(500).json({ message: "Error listing pictures", error });
  }
};

// Update a picture
// Endpoint: PUT /:id
// Requires the picture ID in the URL and title or access in the request body.
exports.updatePicture = async (req, res) => {
  try {
    if (!isValidPictureId(req.params.id)) {
      return res.status(400).json({ message: "Invalid picture ID" });
    }
    const { title, access } = req.body;
    const picture = await Picture.findOne({
      where: { id: parseInt(req.params.id), userId: req.user.id },
    });
    if (!picture) {
      return res.status(404).json({ message: "Picture not found" });
    }
    if (title) picture.title = title;
    if (access) picture.access = access;
    await picture.save();
    return res.status(200).json(picture);
  } catch (error) {
    return res.status(500).json({ message: "Error updating picture", error });
  }
};

// Delete a picture
// Endpoint: DELETE /:id
// Requires the picture ID in the URL parameter.
exports.deletePicture = async (req, res) => {
  try {
    if (!isValidPictureId(req.params.id)) {
      return res.status(400).json({ message: "Invalid picture ID" });
    }
    const picture = await Picture.findOne({
      where: { id: parseInt(req.params.id), userId: req.user.id },
    });
    if (!picture) {
      return res.status(404).json({ message: "Picture not found" });
    }
    await picture.destroy();
    return res.status(200).json({ message: "Picture deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting picture", error });
  }
};
