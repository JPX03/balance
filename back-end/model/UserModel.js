const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  account: { type: String, unique: true },
  createTime: String,
  password: String,
  gender: String,
  age: Number,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
