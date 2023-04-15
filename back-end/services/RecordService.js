const RecordModel = require("../model/RecordModel");

const RecordService = {
  getWeightList: (userId) => {
    return RecordModel.find({ userId: userId }, ["weight"]).then((res) => {
      if (res?.length == 0) {
        return [];
      } else {
        return res[0]?.weight;
      }
    });
  },
  getBodyFatRatioList: (userId) => {
    return RecordModel.find({ userId: userId }, ["bodyFatRatio"]).then((res) => {
      if (res?.length == 0) {
        return [];
      } else {
        return res[0]?.bodyFatRatio;
      }
    });
  },
  getBloodFatList: (userId) => {
    return RecordModel.find({ userId: userId }, ["bloodFat"]).then((res) => {
      if (res?.length == 0) {
        return [];
      } else {
        return res[0]?.bloodFat;
      }
    });
  },
  getBloodPressureList: (userId) => {
    return RecordModel.find({ userId: userId }, ["bloodPressure"]).then((res) => {
      if (res?.length == 0) {
        return [];
      } else {
        return res[0]?.bloodPressure;
      }
    });
  },
  getBloodSugarList: (userId) => {
    return RecordModel.find({ userId: userId }, ["bloodSugar"]).then((res) => {
      if (res?.length == 0) {
        return [];
      } else {
        return res[0]?.bloodSugar;
      }
    });
  },
  updateWeight: (userId, weight) => {
    return RecordModel.updateOne(
      { userId: userId },
      {
        weight: weight,
      }
    ).then((res) => {
      if (res.acknowledged) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  updateBodyFatRatio: (userId, bodyFatRatio) => {
    return RecordModel.updateOne(
      { userId: userId },
      {
        bodyFatRatio: bodyFatRatio,
      }
    ).then((res) => {
      if (res.acknowledged) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  updateBloodFat: (userId, bloodFat) => {
    return RecordModel.updateOne(
      { userId: userId },
      {
        bloodFat: bloodFat,
      }
    ).then((res) => {
      if (res.acknowledged) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  updateBloodPressure: (userId, bloodPressure) => {
    return RecordModel.updateOne(
      { userId: userId },
      {
        bloodPressure: bloodPressure,
      }
    ).then((res) => {
      if (res.acknowledged) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  updateBloodSugar: (userId, bloodSugar) => {
    return RecordModel.updateOne(
      { userId: userId },
      {
        bloodSugar: bloodSugar,
      }
    ).then((res) => {
      if (res.acknowledged) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
};

module.exports = RecordService;
