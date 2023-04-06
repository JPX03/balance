const UserService = require("../services/UserService");

const UserController = {
  addUser: async (req, res) => {
    const { username, gender, age, account, password, createTime } = req.body;
    const result = await UserService.addUser(username, gender, age, account, password, createTime);
    if (result.success) {
      res.send({
        data: result.data,
        success: true,
      });
    } else {
      res.send({ success: false, reason: result.message });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.body;
    const result = await UserService.deleteUser(id);
    if (result == "success") {
      res.send({
        success: true,
      });
    } else {
      res.send({ success: false });
    }
  },

  updateUser: async (req, res) => {
    const { id, username, password } = req.body;
    const result = await UserService.updateUser(id, username, password);
    if (result == "success") {
      res.send({
        success: true,
      });
    } else {
      res.send({ success: false });
    }
  },

  signIn: async (req, res) => {
    const { account, password } = req.body;
    const result = await UserService.signIn(account, password);
    if (result.success) {
      res.send({
        success: true,
        data: result.data,
      });
    } else {
      res.send({ success: false });
    }
  },

  getList: async (req, res) => {
    const { curPage, number } = req.body;
    const result = await UserService.getList(curPage, number);
    if (result.data.length != 0) {
      res.send({
        success: true,
        total: result.total,
        data: result.data,
      });
    } else {
      res.send({
        success: false,
      });
    }
  },

  getDetails: async (req, res) => {
    const { id } = req.body;
    const result = await UserService.getDetails(id);
    res.send(result);
  },
};

module.exports = UserController;
