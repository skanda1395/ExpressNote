const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  todoName: String,
  todoDescription: String,
});

const userSchema = new Schema({
  username: String,
  googleId: String,
  thumbnail: String,
  todos: [todoSchema]
});

const User = mongoose.model("user", userSchema);

module.exports = { User, todoSchema };