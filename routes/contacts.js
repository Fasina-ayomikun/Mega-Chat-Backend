const express = require("express");
const {
  createContact,
  updateContact,
  deleteContact,
  getUserContacts,
} = require("../controllers/contacts");
const router = express.Router();
router.route("/").post(createContact);
router
  .route("/:id")
  .get(getUserContacts)
  .patch(updateContact)
  .delete(deleteContact);
module.exports = router;
