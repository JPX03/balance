const AskService = require("../services/AskService");
const AnswerService = require("../services/AnswerService");

const AskController = {
  addAsk: async (req, res) => {
    const { username, userId, title, content, createTime, likeNum, commentNum } = req.body;
    const result = await AskService.addAsk(username, userId, title, content, createTime, likeNum, commentNum);
    if (result.success) {
      res.send({
        success: true,
      });
    } else {
      res.send({ success: false });
    }
  },

  deleteAsk: async (req, res) => {
    const { id } = req.body;
    const result1 = await AnswerService.deleteByAskId(id);
    if (result1 === "success") {
      const result2 = await AskService.deleteAsk(id);
      if (result2 == "success") {
        res.send({
          success: true,
        });
      } else {
        res.send({ success: false });
      }
    } else {
      res.send({ success: false });
    }
  },

  getList: async (req, res) => {
    const { curPage, number } = req.body;
    if (req.body?.userId) {
      const { userId } = req.body;
      const result = await AskService.getList(curPage, number, userId);
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
    } else {
      const result = await AskService.getList(curPage, number);
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
    }
  },

  getDetails: async (req, res) => {
    const { askId } = req.body;
    const result = await AskService.getDetails(askId);
    if (result.length !== 0) {
      res.send({
        success: true,
        data: result[0],
      });
    } else {
      res.send({
        success: false,
      });
    }
  },
};

module.exports = AskController;
