var express = require("express");
var router = express.Router();
const ArticleController = require("../controllers/ArticleController");

router.post("/getList", ArticleController.getList);
router.post("/getDetails", ArticleController.getDetails);

module.exports = router;
