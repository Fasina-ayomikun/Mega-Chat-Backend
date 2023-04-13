const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");
const checkError = require("../middlewares/error-handler");
const Contact = require("../model/Contact");
const Conversation = require("../model/Conversation");
const User = require("../model/User");

const createConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    if (!senderId || !receiverId) {
      throw new BadRequestError("Please provide all credentials");
    }
    const senderExist = await User.findOne({ phone: senderId });
    const receiverExist = await User.findOne({ phone: receiverId });

    if (!senderExist || !receiverExist) {
      throw new NotFoundError("User does not use Mega Chat");
    }
    const conversationExist = await Conversation.findOne({
      members: [senderId, receiverId],
    });
    if (conversationExist) {
      throw new BadRequestError(
        "These Users already have an existing conversation"
      );
    }
  
    const conversation = await Conversation.create({
      members: [senderId, receiverId],

    });
    res.status(201).json({
      conversation,
      success: true,
      msg: "New Conversation created",
    });
  } catch (error) {
    checkError(res, error);
  }
};

const deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.findOneAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      msg: "Conversation deleted successfully",
    });
  } catch (error) {
    checkError(res, error);
  }
};
const getUserConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const conversations = await Conversation.find({
      members: { $in: [id] },
    });
    res.status(200).json({ conversations });
  } catch (error) {
    checkError(res, error);
  }
};

module.exports = {
  createConversation,
  deleteConversation,
  getUserConversation,
};
