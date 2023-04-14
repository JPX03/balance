import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Card, Button, Modal, DatePicker, InputNumber, Col, Row } from "antd-v5";
import dayjs from "dayjs";
import { Line } from "@ant-design/plots";
import BMI from "./bmi";

const Weight = () => {
  const [data, setData] = useState([]);
  const [time, setTime] = useState("");
  const [weight, setWeight] = useState(0);
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
          item.scales = weight;
        }
      });
      if (shouldAdd) {
        list?.push({
          Date: time,
          scales: weight,
        });
      }
      fetch("http://localhost:4000/api/records/updateWeight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: message.id,
          weight: JSON.stringify(list),
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.success) {
            alert("修改成功！");
            setWeight(0);
            setIsModalOpen1(false);
          }
        })
        .catch(() => {
          alert("网络错误！");
        });
    }
  };
  const handleCancel1 = () => {
    setWeight(0);
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
    setWeight(value);
  };

  const getList = (userId, listName) => {
    fetch("http://localhost:4000/api/records/getList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        listName: listName,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(JSON.parse(res?.data));
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
    getList(message.id, "weight");
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
      title="体重/BMI"
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
      <div style={{ height: "50vh", width: "100%" }}>
        <p style={{ marginBottom: "3vh" }}>身高：175</p>
        <Row style={{ height: "55%", width: "100%" }}>
          <Col span={12} style={{ height: "100%", width: "100%" }}>
            <Line {...config} style={{ height: "100%", width: "96%" }} />
          </Col>
          <Col span={12} style={{ height: "100%", width: "100%" }}>
            <BMI></BMI>
          </Col>
        </Row>
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
        <span>体重：</span>
        <InputNumber min={0} max={150} defaultValue={0} value={weight} onChange={onNumberChange} placeholder="单位kg" />
      </Modal>
      <Modal title="建议" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
        <p>
          一般认为，数值在18.5~23.9之间为成年人的标准身高质量指数，超过24即为超重，超过28即为肥胖，35以上就是病态肥胖。
        </p>
        <br></br>
        <p>你当前的体重为：65kg,BMI为：21.2,身材标准，请继续保持！</p>
      </Modal>
    </Card>
  );
};

export default Weight;
