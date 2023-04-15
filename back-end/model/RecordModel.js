const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const RecordSchema = new Schema({
  userId: String,
  weight: String,
  bodyFatRatio: String,
  bloodFat: String,
  bloodSugar: String,
  bloodPressure: String,
});

const RecordModel = mongoose.model("record", RecordSchema);

module.exports = RecordModel;
