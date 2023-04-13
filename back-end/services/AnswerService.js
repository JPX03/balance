const AnswerModel = require("../model/AnswerModel");

const AnswerService = {
  addAnswer: (askId, userId, username, createTime, content) => {
    return AnswerModel.create({
      askId,
      userId,
      username,
      createTime,
      content,
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
  deleteAnswer: (id) => {
    return AnswerModel.deleteOne({ _id: id }).then((res) => {
      if (res.deletedCount == 1) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  getList: (curPage, number, askId) => {
    return AnswerModel.find({ askId: askId }).then((res) => {
      return { total: res.length, data: res.splice((curPage - 1) * number, number) };
    });
  },
  deleteByAskId: (askId) => {
    return AnswerModel.deleteMany({ askId: askId }).then((res) => {
      if (res.acknowledged) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
};

module.exports = AnswerService;
