const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");
const checkError = require("../middlewares/error-handler");
const Contact = require("../model/Contact");
const User = require("../model/User");

const createContact = async (req, res) => {
  try {
    const { phone, name, user: userId } = req.body;
    if (!phone) {
      throw new BadRequestError("Please provide user's phone number");
    }
    const contactUser = await User.findOne({ phone });
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundError("User does not exist");
    }
    if (!contactUser) {
      throw new NotFoundError("This user does not use Mega Chat");
    }
    const contact = await Contact.findOne({ phone, user: userId });

    if (contact) {
      throw new BadRequestError("This contact already exists");
    }
    const newContact = await Contact.create({
      name: name || contactUser.name,
      phone,
      user: userId,
      profilePicture: contactUser?.profilePicture,
      bio: contactUser?.bio,
    });
    res.status(201).json({
      contact: newContact,
      success: true,
      msg: "Contact created successfully",
    });
  } catch (error) {
    checkError(res, error);
  }
};
const updateContact = async (req, res) => {
  try {
    const { phone, name, user: userId } = req.body;
    const { id } = req.params;
    if (!phone) {
      throw new BadRequestError("Please provide user's phone number");
    }
    const user = await User.findOne({ phone });

    if (!user) {
      throw new NotFoundError("This user does not use Mega Chat");
    }
    const contact = await Contact.findOne({ _id: id, user: userId });

    const alreadyExistingContact = await Contact.findOne({
      phone,
      user: userId,
    });
    console.log(alreadyExistingContact);
    // console.log(userId);
    if (!contact) {
      throw new BadRequestError("This contact does not exist");
    }
    if (
      alreadyExistingContact &&
      alreadyExistingContact?.phone !== contact?.phone
    ) {
      throw new BadRequestError("This contact  already exists");
    }

    await Contact.findOneAndUpdate(
      {
        _id: id,
        user: userId,
      },
      req.body
    );
    res.status(200).json({
      success: true,
      msg: "Contact updated successfully",
    });
  } catch (error) {
    checkError(res, error);
  }
};
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findOne({ _id: id });
    console.log(contact);
    if (!contact) {
      throw new BadRequestError("This contact does not exist");
    }

    await Contact.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      msg: "Contact deleted successfully",
    });
  } catch (error) {
    console.log(error);
    checkError(res, error);
  }
};
const getUserContacts = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const contacts = await Contact.find({ user: userId });
    res.status(200).json({ contacts });
  } catch (error) {
    checkError(res, error);
  }
};
module.exports = {
  createContact,
  updateContact,
  getUserContacts,
  deleteContact,
};
