const RecordService = require("../services/RecordService");

const RecordController = {
  getWeightList: async (req, res) => {
    const { userId } = req.body;
    const result = await RecordService.getWeightList(userId);
    if (result?.length != 0) {
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
  getBodyFatRatioList: async (req, res) => {
    const { userId } = req.body;
    const result = await RecordService.getBodyFatRatioList(userId);
    if (result?.length != 0) {
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
  getBloodFatList: async (req, res) => {
    const { userId } = req.body;
    const result = await RecordService.getBloodFatList(userId);
    if (result?.length != 0) {
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
  getBloodPressureList: async (req, res) => {
    const { userId } = req.body;
    const result = await RecordService.getBloodPressureList(userId);
    if (result?.length != 0) {
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
  getBloodSugarList: async (req, res) => {
    const { userId } = req.body;
    const result = await RecordService.getBloodSugarList(userId);
    if (result?.length != 0) {
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
  updateBodyFatRatio: async (req, res) => {
    const { userId, bodyFatRatio } = req.body;
    const result = await RecordService.updateBodyFatRatio(userId, bodyFatRatio);
    if (result == "success") {
      res.send({
        success: true,
      });
    } else {
      res.send({ success: false });
    }
  },
  updateBloodFat: async (req, res) => {
    const { userId, bloodFat } = req.body;
    const result = await RecordService.updateBloodFat(userId, bloodFat);
    if (result == "success") {
      res.send({
        success: true,
      });
    } else {
      res.send({ success: false });
    }
  },
  updateBloodPressure: async (req, res) => {
    const { userId, bloodPressure } = req.body;
    const result = await RecordService.updateBloodPressure(userId, bloodPressure);
    if (result == "success") {
      res.send({
        success: true,
      });
    } else {
      res.send({ success: false });
    }
  },
  updateBloodSugar: async (req, res) => {
    const { userId, bloodSugar } = req.body;
    const result = await RecordService.updateBloodSugar(userId, bloodSugar);
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
