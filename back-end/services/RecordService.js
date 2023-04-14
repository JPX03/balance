const RecordModel = require("../model/RecordModel");

const RecordService = {
  getList: (userId, listName) => {
    return RecordModel.find({ userId: userId }, [listName]).then((res) => {
      return res[0][listName];
    });
  },
  updateWeight: (userId, weight) => {
    return RecordModel.updateOne(
      { userId: userId },
      {
        weight: weight,
      }
    ).then((res) => {
      if (res.acknowledged) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
};

module.exports = RecordService;
