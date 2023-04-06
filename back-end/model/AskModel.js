const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const AskSchema = new Schema({
  username: String,
  userId: String,
  createTime: String,
  title: String,
  content: String,
  likeNum: Number,
  commentNum: Number,
});

const AskModel = mongoose.model("ask", AskSchema);

module.exports = AskModel;
