const express = require("express");
const { registerUser, getSingleUser } = require("../controllers/user");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/:id").get(getSingleUser);
module.exports = router;
