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
      required: true,
      default:
        "https://res.cloudinary.com/dn4lenrqs/image/upload/v1681243665/Mega-Chat/tmp-2-1681243655947_nhfxu7.jpg",
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
