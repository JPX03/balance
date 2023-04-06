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
      .then((res) => {
        const { _id, username, gender } = res;
        const data = {
          id: _id,
          username: username,
          gender: gender,
        };
        return {
          success: true,
          data: data,
        };
      })
      .catch((err) => {
        return err;
      });
  },
  deleteUser: (id) => {
    return UserModel.deleteOne({ _id: id }).then((res) => {
      if (res.deletedCount == 1) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  updateUser: (id, username, password) => {
    return UserModel.updateOne(
      { _id: id },
      {
        username: username,
        password: password,
      }
    ).then((res) => {
      if (res.modifiedCount == 1) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  signIn: (account, password) => {
    return UserModel.find({ account: account, password: password }, ["_id", "username", "gender"]).then((res) => {
      if (res.length === 1) {
        const { _id, username, gender } = res[0];
        const data = {
          id: _id,
          username: username,
          gender: gender,
        };
        return {
          success: true,
          data: data,
        };
      } else {
        return "failed";
      }
    });
  },
  getList: (curPage, number) => {
    return UserModel.find({}, ["_id", "username", "gender", "createTime", "account"]).then((res) => {
      return { total: res.length, data: res.splice((curPage - 1) * number, number) };
    });
  },
  getDetails: (id) => {
    return UserModel.find({ _id: id });
  },
};

module.exports = UserService;
