const mongoose = require("mongoose");
const { Schema } = mongoose;

// user schema

const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: String,
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    },
    password: { type: String, required: true },
    age: Number,
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todos" }],
  },
  { versionKey: false, timestamps: true }
);
// create the user model
const User = mongoose.model("Users", userSchema);

module.exports = User;
