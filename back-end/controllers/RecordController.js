const RecordService = require("../services/RecordService");

const RecordController = {
  getList: async (req, res) => {
    const { userId, listName } = req.body;
    const result = await RecordService.getList(userId, listName);
    if (result != "") {
      res.send({
        success: true,
        data: result,
      });
    } else {
      res.send({
        success: false,
      });
    }
  },
  updateWeight: async (req, res) => {
    const { userId, weight } = req.body;
    const result = await RecordService.updateWeight(userId, weight);
    if (result == "success") {
      res.send({
        success: true,
      });
    } else {
      res.send({ success: false });
    }
  },
};

module.exports = RecordController;
