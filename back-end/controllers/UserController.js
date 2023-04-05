const UserService = require("../services/UserService");

const UserController = {
  addUser: async (req, res) => {
    const { username, gender, age, account, password, createTime } = req.body;
    const result = await UserService.addUser(username, gender, age, account, password, createTime);
    if (result == "success") {
      res.send({
        success: true,
      });
    } else {
      res.send({ success: false, reason: result.message });
    }
  },
};

module.exports = UserController;
