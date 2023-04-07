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
  getList: (curPage, number, userId) => {
    if (userId) {
      return AskModel.find({ userId: userId }, ["_id", "title", "content"]).then((res) => {
        return { total: res.length, data: res.splice((curPage - 1) * number, number) };
      });
    } else {
      return AskModel.find({}, ["_id", "title", "content"]).then((res) => {
        return { total: res.length, data: res.splice((curPage - 1) * number, number) };
      });
    }
  },
  getDetails: (askId) => {
    return AskModel.find({ _id: askId });
  },
};

module.exports = AskService;
