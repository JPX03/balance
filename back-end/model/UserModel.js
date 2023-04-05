const { Number } = require("mongoose");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserType = {
  username: String,
  account: String,
  createTime: String,
  password: String,
  gender: String,
  age: Number,
};

const UserModel = mongoose.model("user", new Schema(UserType));

module.exports = UserModel;
