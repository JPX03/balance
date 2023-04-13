const ArticleModel = require("../model/ArticleModel");

const ArticleService = {
  getList: (curPage, number, articleId) => {
    return ArticleModel.find({ articleId: articleId }).then((res) => {
      res.forEach((item) => {
        if (item.content.length > 60) {
          item.content = item.content.slice(0, 60) + "...";
        } else {
          item.content = item.content + "...";
        }
        if (item.title.length > 15) {
          item.title = item.title.slice(0, 15) + "...";
        }
      });
      return { total: res.length, data: res.splice((curPage - 1) * number, number) };
    });
  },
  getDetails: (articleId) => {
    return ArticleModel.find({ _id: articleId });
  },
};

module.exports = ArticleService;
