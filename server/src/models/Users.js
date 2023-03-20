const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: { type: String,required:true },
    phoneOrEmail: {type: String, required: true, maxLength: 50},
    password: { type: String, required:true },
    gender:{type:String, enum: ['male', 'female', 'other']},
    photo:{type:String}
  },
  { collection: "users" }
);
module.exports = mongoose.model("Users", usersSchema);