var express = require("express");
var router = express.Router();
const UserController = require("../controllers/UserController");

//增加用户
router.post("/addUser", UserController.addUser);

module.exports = router;
