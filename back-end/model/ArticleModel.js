const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  title: String,
  time: String,
  content: String,
  source: String,
});

const ArticleModel = mongoose.model("article", ArticleSchema);

module.exports = ArticleModel;
