var express = require("express");
var router = express.Router();
const ManagerController = require("../controllers/ManagerController");

/* GET home page. */

router.post("/signIn", ManagerController.signIn);

module.exports = router;
