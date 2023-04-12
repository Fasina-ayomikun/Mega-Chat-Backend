const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");
const checkError = require("../middlewares/error-handler");
const Conversation = require("../model/Conversation");
const Messages = require("../model/Messages");
const User = require("../model/User");

const createMessages = async (req, res) => {
  try {
    const { conversationId, senderId, text } = req.body;
    if (!senderId || !conversationId || !text) {
      throw new BadRequestError("Please provide all credentials");
    }
    const senderExist = await User.findOne({ phone: senderId });
    const conversationExist = await Conversation.findOne({
      _id: conversationId,
    });
    if (!senderExist) {
      throw new NotFoundError("User does not use Mega Chat");
    }
    if (!conversationExist) {
      throw new NotFoundError("Conversation does not exist");
    }

    const message = await Messages.create(req.body);
    res
      .status(201)
      .json({ message, success: true, msg: "New message created" });
  } catch (error) {
    checkError(res, error);
  }
};
const editMessage = async (req, res) => {
  try {
    const { conversationId, senderId, text } = req.body;
    const { id } = req.params;

    if (!senderId || !conversationId || !text) {
      throw new BadRequestError("Please provide all credentials");
    }
    const senderExist = await User.findOne({ phone: senderId });
    const conversationExist = await Conversation.findOne({
      _id: conversationId,
    });
    if (!senderExist) {
      throw new NotFoundError("User does not use Mega Chat");
    }
    if (!conversationExist) {
      throw new NotFoundError("Conversation does not exist");
    }
    const messageExist = await Messages.findOne({ _id: id });
    if (!messageExist) {
      throw new NotFoundError("Message has been deleted");
    }

    const editedMessage = await Messages.findOneAndUpdate(
      {
        _id: id,
        conversationId,
        senderId,
      },
      req.body
    );
    res.status(200).json({
      success: true,
      msg: "Message updated successfully",
    });
  } catch (error) {
    checkError(res, error);
  }
};
const deleteMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Messages.findOneAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      msg: "Message deleted successfully",
    });
  } catch (error) {
    checkError(res, error);
  }
};

const clearMessages = async (req, res) => {
  try {
    const { id: conversationId } = req.params;
    const message = await Messages.deleteMany({ conversationId });
    res.status(200).json({ message });
  } catch (error) {
    checkError(res, error);
  }
};
const getUsersMessages = async (req, res) => {
  try {
    const { id: conversationId } = req.params;
    const messages = await Messages.find({ conversationId });
    res.status(200).json({ messages });
  } catch (error) {
    checkError(res, error);
  }
};

module.exports = {
  createMessages,
  deleteMessages,
  getUsersMessages,
  editMessage,
  clearMessages,
};
