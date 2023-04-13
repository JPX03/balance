const AskModel = require("../model/AskModel");

const AskService = {
  addAsk: (username, userId, title, content, createTime, likeNum, commentNum) => {
    return AskModel.create({
      username,
      userId,
      title,
      content,
      createTime,
      likeNum,
      commentNum,
    })
      .then(() => {
        return {
          success: true,
        };
      })
      .catch((err) => {
        return err;
      });
  },
  deleteAsk: (id) => {
    return AskModel.deleteOne({ _id: id }).then((res) => {
      if (res.deletedCount == 1) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  getList: (curPage, number, userId) => {
    if (userId) {
      return AskModel.find({ userId: userId }).then((res) => {
        return { total: res.length, data: res.splice((curPage - 1) * number, number) };
      });
    } else {
      return AskModel.find({}).then((res) => {
        return { total: res.length, data: res.splice((curPage - 1) * number, number) };
      });
    }
  },
  getDetails: (askId) => {
    return AskModel.find({ _id: askId });
  },
};

module.exports = AskService;
