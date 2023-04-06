const ManagerModel = require("../model/ManagerModel");

const ManagerService = {
  signIn: (account, password) => {
    return ManagerModel.find({ account: account, password: password }, ["_id", "managername"]).then((res) => {
      if (res.length === 1) {
        return {
          success: true,
          data: res[0],
        };
      } else {
        return "failed";
      }
    });
  },
};

module.exports = ManagerService;
