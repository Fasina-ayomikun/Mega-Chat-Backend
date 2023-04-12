const mongoose = require("mongoose");

const ConversationsSchema = mongoose.Schema(
  {
    members: {
      type: Array,
    },
    receiver: {
      type: Array,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Conversation", ConversationsSchema);
