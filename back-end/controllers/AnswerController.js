const AnswerService = require("../services/AnswerService");
const Answervice = require("../services/AnswerService");

const AnswerController = {
  addAnswer: async (req, res) => {
    const { askId, userId, username, createTime, content } = req.body;
    const result = await Answervice.addAnswer(askId, userId, username, createTime, content);
    if (result.success) {
      res.send({
        success: true,
      });
    } else {
      res.send({ success: false });
    }
  },
  getList: async (req, res) => {
    const { curPage, number, askId } = req.body;
    const result = await AnswerService.getList(curPage, number, askId);
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
  },
  deleteAnswer: async (req, res) => {
    const { id } = req.body;
    const result = await AnswerService.deleteAnswer(id);
    if (result == "success") {
      res.send({
        success: true,
      });
    } else {
      res.send({ success: false });
    }
  },
  deleteByAskId: async (req, res) => {
    const { askId } = req.body;
    const result = await AnswerService.deleteByAskId(askId);
    if (result == "success") {
      res.send({
        success: true,
      });
    } else {
      res.send({ success: false });
    }
  },
};

module.exports = AnswerController;
