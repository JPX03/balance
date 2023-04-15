import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Card, Button, Modal, DatePicker, InputNumber } from "antd-v5";
import dayjs from "dayjs";
import { Line } from "@ant-design/plots";

const BloodFat = () => {
  const [data, setData] = useState([]);
  const [time, setTime] = useState("");
  const [bloodFat, setBloodFat] = useState(0);
  const [latestBloodFat, setLatestBloodFat] = useState(0);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const storage = window.localStorage;
  const message = JSON.parse(storage.getItem("message"));

  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const handleOk1 = () => {
    if (time == "" || time == null) {
      alert("请输入选择时间");
    } else {
      const list = data;
      let shouldAdd = true;
      list?.forEach((item) => {
        if (item.Date == time) {
          shouldAdd = false;
          item.scales = bloodFat;
        }
      });
      if (shouldAdd) {
        list?.push({
          Date: time,
          scales: bloodFat,
        });
      }
      fetch("http://localhost:4000/api/records/updateBloodFat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: message.id,
          bloodFat: JSON.stringify(list),
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.success) {
            alert("修改成功！");
            setBloodFat(0);
            setIsModalOpen1(false);
          }
        })
        .catch(() => {
          alert("网络错误！");
        });
    }
  };
  const handleCancel1 = () => {
    setBloodFat(0);
    setIsModalOpen1(false);
  };
  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleOk2 = () => {
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  const onDateChange = (date) => {
    setTime(date?.format("YYYY-MM-DD"));
  };
  const onNumberChange = (value) => {
    setBloodFat(value);
  };

  const getList = (userId) => {
    fetch("http://localhost:4000/api/records/getBloodFatList", {
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
        if (res?.success) {
          const list = JSON.parse(res?.data);
          setData(list);
          setLatestBloodFat(list[list.length - 1].scales);
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
    // yAxis: {
    // max: Math.floor(getMaxMin(data).max) + 1,
    // min: Math.floor(getMaxMin(data).min) - 1,
    // tickInterval: 2,
    // tickCount: 1,
    // },
    xAxis: {
      type: "timeCat",
      tickCount: 10,
    },
  };

  return (
    <Card
      hoverable
      title="血脂(总胆固醇)"
      extra={
        <div>
          <Button type="link" size="small" onClick={showModal1}>
            添加
          </Button>
          <Button type="link" size="small" onClick={showModal2}>
            建议
          </Button>
        </div>
      }
      style={{ width: "95%", height: "45vh" }}
    >
      <div style={{ height: "30vh" }}>
        <Line {...config} />
      </div>
      <Modal title="添加" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
        <br />
        <DatePicker
          presets={[
            { label: "昨天", value: dayjs().add(-1, "d") },
            { label: "上周", value: dayjs().add(-7, "d") },
            { label: "上月", value: dayjs().add(-1, "month") },
          ]}
          onChange={onDateChange}
        />
        <br />
        <br />
        <span>血脂(总胆固醇)：</span>
        <InputNumber
          min={0}
          max={20}
          defaultValue={0}
          value={bloodFat}
          onChange={onNumberChange}
          placeholder="单位kg"
        />
      </Modal>
      <Modal title="建议" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
        <p>
          血脂是血浆中的中性脂肪（甘油三酯）和类脂（磷脂、糖脂、固醇、类固醇）的总称，广泛存在于人体中。它们是生命细胞的基础代谢必需物质。一般说来，血脂中的主要成分是甘油三酯和胆固醇，其中甘油三酯参与人体内能量代谢，而胆固醇则主要用于合成细胞浆膜、类固醇激素和胆汁酸。
        </p>
        <p>正常水平：其中总胆固醇3~ 5.2 mmol/L，甘油三酯为0.56~1.7mmol/L</p>
        <p>您最近的总胆固醇为{latestBloodFat}mmol/L</p>
      </Modal>
    </Card>
  );
};

export default BloodFat;
