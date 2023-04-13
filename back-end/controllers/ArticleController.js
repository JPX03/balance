const ArticleService = require("../services/ArticleService");

const ArticleController = {
  getList: async (req, res) => {
    const { curPage, number, articleId } = req.body;
    const result = await ArticleService.getList(curPage, number, articleId);
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
  getDetails: async (req, res) => {
    const { articleId } = req.body;
    const result = await ArticleService.getDetails(articleId);
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

module.exports = ArticleController;
