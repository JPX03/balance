import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";

const BMI = () => {
  const [data, setData] = useState([]);
  const storage = window.localStorage;
  const message = JSON.parse(storage.getItem("message"));
  const height = message.height;

  const getList = (userId) => {
    fetch("http://localhost:4000/api/records/getWeightList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.success) {
          const list = JSON.parse(res?.data);
          list?.forEach((item) => {
            item.scales = item.scales / ((height / 100) * (height / 100));
          });
          setData(list);
        } else {
          setData([]);
        }
      })
      .catch(() => {
        alert("网络错误！");
      });
  };

  const getMaxMin = (arr) => {
    let max = arr[0]?.scales;
    let min = arr[0]?.scales;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]?.scales >= max) {
        max = arr[i]?.scales;
      } else {
        min = arr[i]?.scales;
      }
    }
    return { max: max, min: min };
  };

  useEffect(() => {
    getList(message.id);
  }, []);

  const config = {
    data,
    padding: "auto",
    xField: "Date",
    yField: "scales",
    yAxis: {
      // type: "timeCat",
      max: Math.floor(getMaxMin(data).max) + 1,
      min: Math.floor(getMaxMin(data).min),
      tickInterval: 2,
      tickCount: 1,
    },
    xAxis: {
      type: "timeCat",
      tickCount: 10,
    },
  };

  return <Line {...config} style={{ height: "100%", width: "96%" }} />;
};

export default BMI;
