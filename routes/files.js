const express = require("express");

const { uploadImage } = require("../controllers/files");
const router = express.Router();
router.route("/").post(uploadImage);

module.exports = router;
