const UserModel = require("../model/UserModel");

const UserService = {
  addUser: (username, gender, age, account, password, createTime) => {
    return UserModel.create({
      username,
      gender,
      age,
      account,
      password,
      createTime,
    })
      .then(() => {
        return "success";
      })
      .catch((err) => {
        return err;
      });
  },
};

module.exports = UserService;
