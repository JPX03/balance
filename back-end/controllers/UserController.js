const UserService = require("../services/UserService");

const UserController = {
  addUser: async (req, res) => {
    const { username, gender, age, account, password, createTime } = req.body;
    await UserService.addUser(username, gender, age, account, password, createTime);
    res.send({
      ok: 1,
    });
  },
};

module.exports = UserController;
