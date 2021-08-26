const mongoose = require("mongoose");
const { Schema } = mongoose;

// user schema

const userSchema = new Schema({
  firstname: { type: String , required :true },
  lastname: String,
  email: { type: String , required :true , unique :true },
  password: { type: String , required :true },
  age: Number,
  todos : [{type : mongoose.Schema.Types.ObjectId , ref : 'todos'}]
  },{ versionKey : false , timestamps :true });
// create the user model
const User = mongoose.model("users", userSchema);

module.exports = User;
