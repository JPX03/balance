var express = require("express");
var router = express.Router();
const AskController = require("../controllers/AskController");

/* GET home page. */

router.post("/addAsk", AskController.addAsk);
router.post("/getList", AskController.getList);
module.exports = router;
