const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Contact", ContactSchema);
