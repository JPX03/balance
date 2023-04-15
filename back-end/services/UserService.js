const UserModel = require("../model/UserModel");
const RecordModel = require("../model/RecordModel");

const UserService = {
  addUser: (username, gender, age, account, password, createTime, height) => {
    return UserModel.create({
      username,
      gender,
      age,
      account,
      password,
      createTime,
      height,
    })
      .then((res) => {
        const { _id, username, gender, height } = res;
        const data = {
          id: _id,
          username: username,
          gender: gender,
          height: height,
        };
        RecordModel.create({
          userId: _id,
          weight: JSON.stringify([]),
          bloodFat: JSON.stringify([]),
          bloodPressure: JSON.stringify([]),
          bloodSugar: JSON.stringify([]),
          bodyFatRatio: JSON.stringify([]),
        });
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
      RecordModel.deleteOne({ userId: id });

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
      if (res.acknowledged) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  signIn: (account, password) => {
    return UserModel.find({ account: account, password: password }, ["_id", "username", "gender", "height"]).then(
      (res) => {
        if (res.length === 1) {
          const { _id, username, gender, height } = res[0];
          const data = {
            id: _id,
            username: username,
            gender: gender,
            height: height,
          };
          return {
            success: true,
            data: data,
          };
        } else {
          return "failed";
        }
      }
    );
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
