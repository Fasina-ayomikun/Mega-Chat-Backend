const mongoose = require("mongoose");
const connectDB = (mongoURI) => {
  console.log("mongo connected");
  return mongoose.connect(mongoURI);
};

module.exports = connectDB;
