const AskService = require("../services/AskService");

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
};

module.exports = AskController;
