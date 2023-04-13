const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
    },
    profilePicture: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
