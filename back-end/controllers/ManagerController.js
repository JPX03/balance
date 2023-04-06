const ManagerService = require("../services/ManagerService");

const ManagerController = {
  signIn: async (req, res) => {
    const { account, password } = req.body;
    const result = await ManagerService.signIn(account, password);
    if (result.success) {
      res.send({
        success: true,
        data: result.data,
      });
    } else {
      res.send({ success: false });
    }
  },
};

module.exports = ManagerController;
