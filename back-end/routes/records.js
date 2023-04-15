var express = require("express");
var router = express.Router();
const RecordController = require("../controllers/RecordController");

/* GET home page. */
router.post("/getWeightList", RecordController.getWeightList);
router.post("/getBodyFatRatioList", RecordController.getBodyFatRatioList);
router.post("/getBloodFatList", RecordController.getBloodFatList);
router.post("/getBloodPressureList", RecordController.getBloodPressureList);
router.post("/getBloodSugarList", RecordController.getBloodSugarList);

router.post("/updateWeight", RecordController.updateWeight);
router.post("/updateBodyFatRatio", RecordController.updateBodyFatRatio);
router.post("/updateBloodFat", RecordController.updateBloodFat);
router.post("/updateBloodPressure", RecordController.updateBloodPressure);
router.post("/updateBloodSugar", RecordController.updateBloodSugar);

module.exports = router;
