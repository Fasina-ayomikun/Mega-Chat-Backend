require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middlewares/not-found");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const fileUploader = require("express-fileupload");
const app = express();
const PORT = 5000 || process.env.PORT;

app.get("/", (req, res) => {
  res.json({ msg: "new" });
});
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_LINK,
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
    ],
  })
);
app.use(
  fileUploader({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_LINK);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/contacts", require("./routes/contacts"));
app.use("/api/v1/conversation", require("./routes/conversation"));
app.use("/api/v1/messages", require("./routes/messages"));
app.use("/api/v1/upload", require("./routes/files"));
app.use(notFoundMiddleware);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log("server listening");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
