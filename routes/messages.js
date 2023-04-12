const express = require("express");
const {
  createMessages,
  getUsersMessages,
  deleteMessages,
  clearMessages,
  editMessage,
} = require("../controllers/messages");
const router = express.Router();
router.route("/").post(createMessages);
router
  .route("/:id")
  .get(getUsersMessages)
  .patch(editMessage)
  .delete(deleteMessages);
router.route("/clear/:id").delete(clearMessages);

module.exports = router;
