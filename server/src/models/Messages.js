const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    senderId: String,
    message: String,
    members: Array,
  },
  {timestamps: true},
  { collection: "message" }
);
module.exports = mongoose.model("Messages", messagesSchema);