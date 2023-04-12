const express = require("express");
const {
  createConversation,
  deleteConversation,
  getUserConversation,
} = require("../controllers/conversation");
const router = express.Router();
router.route("/").post(createConversation);
router.route("/:id").get(getUserConversation).delete(deleteConversation);
module.exports = router;
