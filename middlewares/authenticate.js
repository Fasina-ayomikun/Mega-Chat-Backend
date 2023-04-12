const authenticate = (req, res, next) => {
  req.user = {
    _id: user._id,
    phone: user.phone,
    profilePicture: user.profilePicture,
    bio: user.bio,
  };
};
