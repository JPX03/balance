var express = require("express");
var router = express.Router();
const AskController = require("../controllers/AskController");

router.post("/addAsk", AskController.addAsk);
router.post("/getList", AskController.getList);
router.post("/getDetails", AskController.getDetails);
router.post("/deleteAsk", AskController.deleteAsk);
module.exports = router;
