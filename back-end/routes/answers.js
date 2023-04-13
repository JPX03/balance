var express = require("express");
var router = express.Router();
const AnswerController = require("../controllers/AnswerController");

router.post("/addAnswer", AnswerController.addAnswer);
router.post("/getList", AnswerController.getList);
router.post("/deleteAnswer", AnswerController.deleteAnswer);

module.exports = router;
