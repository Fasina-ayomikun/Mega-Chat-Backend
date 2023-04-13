const NotFoundError = require("../errors/not-found");
const checkError = require("../middlewares/error-handler");
const User = require("../model/User");

const registerUser = async (req, res) => {
  try {
    const { phone, profilePicture } = req.body;
    if (!profilePicture) {
      req.body.profilePicture =
        "https://res.cloudinary.com/dn4lenrqs/image/upload/v1681243665/Mega-Chat/tmp-2-1681243655947_nhfxu7.jpg";
    }
    const user = await User.findOne({ phone });
    if (user) {
      res
        .status(200)
        .json({ user, success: true, msg: "User logged In successfully" });
    } else {
      const newUser = await User.create(req.body);
      res.status(201).json({
        user: newUser,
        success: true,
        msg: "Registration successful",
      });
    }
  } catch (error) {
    checkError(res, error);
  }
};
const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ phone: id });
    if (!user) {
      throw new NotFoundError("User does not use Mega Chat");
    }
    res.status(200).json({ user });
  } catch (error) {
    checkError(res, error);
  }
};
module.exports = { registerUser, getSingleUser };
