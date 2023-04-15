import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Card, Button, Modal, DatePicker, InputNumber } from "antd-v5";
import dayjs from "dayjs";
import { Line } from "@ant-design/plots";

const BloodFat = () => {
  const [data, setData] = useState([]);
  const [time, setTime] = useState("");
  const [bloodFat, setBloodFat] = useState(0);
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
          setData(JSON.parse(res?.data));
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
      max: Math.floor(getMaxMin(data).max) + 1,
      min: Math.floor(getMaxMin(data).min),
      tickInterval: 3,
      tickCount: 1,
    },
    xAxis: {
      type: "timeCat",
      tickCount: 10,
    },
  };

  return (
    <Card
      hoverable
      title="血脂"
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
        <span>血脂：</span>
        <InputNumber
          min={0}
          max={150}
          defaultValue={0}
          value={bloodFat}
          onChange={onNumberChange}
          placeholder="单位kg"
        />
      </Modal>
      <Modal title="建议" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Card>
  );
};

export default BloodFat;
