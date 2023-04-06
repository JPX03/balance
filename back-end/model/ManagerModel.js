const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const managerSchema = new Schema({
  managername: String,
  account: { type: String, unique: true },
  password: String,
});

const ManagerModel = mongoose.model("manager", managerSchema);

module.exports = ManagerModel;
