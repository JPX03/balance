const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const AnswerSchema = new Schema({
  askId: String,
  username: String,
  userId: String,
  createTime: String,
  content: String,
});

const AnswerModel = mongoose.model("answer", AnswerSchema);

module.exports = AnswerModel;
