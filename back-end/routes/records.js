var express = require("express");
var router = express.Router();
const RecordController = require("../controllers/RecordController");

/* GET home page. */

router.post("/getList", RecordController.getList);
router.post("/updateWeight", RecordController.updateWeight);

module.exports = router;
