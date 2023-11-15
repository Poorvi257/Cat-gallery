// pictureRoutes.js
const express = require("express");
const router = express.Router();
const pictureController = require("../../controllers/pictureController");
const authMiddleware = require("../../middleware/authMiddleware");
const upload = require("../../utils/multerConfig");

router.post("/upload", authMiddleware, upload, pictureController.upload);
router.get("/:id", authMiddleware, pictureController.fetchPictureById);
router.get("/", authMiddleware, pictureController.listAllPictures);
router.put("/:id", authMiddleware, upload, pictureController.updatePicture);
router.delete("/:id", authMiddleware, pictureController.deletePicture);

module.exports = router;
