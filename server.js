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
require("dotenv").config();

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/contacts", require("./routes/contacts"));
app.use("/api/v1/conversation", require("./routes/conversation"));
app.use("/api/v1/messages", require("./routes/messages"));
app.use("/api/v1/upload", require("./routes/files"));
app.use(notFoundMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

const server = app.listen(PORT, () => {
  console.log("server listening");
});
start();
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONTEND_LINK,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
