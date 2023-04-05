var express = require("express");
var router = express.Router();
const UserController = require("../controllers/UserController");

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

router.post("/addUser", UserController.addUser);

module.exports = router;
