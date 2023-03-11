const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: { type: String },
    // phone: { type: Number, required: function() { return !this.email; } },
    // email: { type: String, required: function() { return !this.phone; } },
    phoneOrEmail: {type: String, required: true, maxLength: 50},
    password: { type: String, required:true },
    gender:{type:String, enum: ['male', 'female', 'other']}
  },
  { collection: "users" }
);
module.exports = mongoose.model("Users", usersSchema);
