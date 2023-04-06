var express = require("express");
var router = express.Router();
const UserController = require("../controllers/UserController");
const UserModel = require("../model/UserModel");

//增加用户
router.post("/addUser", UserController.addUser);
//删除用户
router.post("/deleteUser", UserController.deleteUser);
//修改用户信息
router.post("/updateUser", UserController.updateUser);
//用户登录
router.post("/signIn", UserController.signIn);
//查找用户列表
router.post("/getList", UserController.getList);
//查找用户详情
router.post("/getDetails", UserController.getDetails);

module.exports = router;
