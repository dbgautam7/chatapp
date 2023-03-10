const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: { type: String },
    phone: { type: Number, required: function() { return !this.email; } },
    email: { type: String, required: function() { return !this.phone; } },
    password: { type: String },
  },
  { collection: "users" }
);
module.exports = mongoose.model("Users", usersSchema);
