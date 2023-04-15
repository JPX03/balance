import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Card, Button, Modal, DatePicker, InputNumber } from "antd-v5";
import dayjs from "dayjs";
import { Line } from "@ant-design/plots";

const BloodPressure = () => {
  const [data, setData] = useState([]);
  const [time, setTime] = useState("");
  const [bloodPressure, setBloodPressure] = useState(0);
  const [latestBloodPressure, setLatestBloodPressure] = useState(0);
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
          item.scales = bloodPressure;
        }
      });
      if (shouldAdd) {
        list?.push({
          Date: time,
          scales: bloodPressure,
        });
      }
      fetch("http://localhost:4000/api/records/updateBloodPressure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: message.id,
          bloodPressure: JSON.stringify(list),
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.success) {
            alert("修改成功！");
            setBloodPressure(0);
            setIsModalOpen1(false);
          }
        })
        .catch(() => {
          alert("网络错误！");
        });
    }
  };
  const handleCancel1 = () => {
    setBloodPressure(0);
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
    setBloodPressure(value);
  };

  const getList = (userId) => {
    fetch("http://localhost:4000/api/records/getBloodPressureList", {
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
          setLatestBloodPressure(list[list.length - 1].scales);
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
    xAxis: {
      type: "timeCat",
      tickCount: 10,
    },
  };

  return (
    <Card
      hoverable
      title="血压（舒张压）"
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
        <span>血压（舒张压）：</span>
        <InputNumber
          min={0}
          max={150}
          defaultValue={0}
          value={bloodPressure}
          onChange={onNumberChange}
          placeholder="单位kg"
        />
      </Modal>
      <Modal title="建议" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
        <p>
          血压（bloodpressure，BP）是指血液在血管内流动时作用于单位面积血管壁的侧压力，它是推动血液在血管内流动的动力。在不同血管内被分别称为动脉血压、毛细血管压和静脉血压，通常所说的血压是指体循环的动脉血压。
        </p>
        <p>
          1.正常血压 正常成人安静状态下的血压范围较稳定，正常范围收缩压90～139mmHg，舒张压60～89mmHg，脉压30～40mmHg。
          2.异常血压 （1）高血压：未使用抗高血压药的前提下，18岁以上成人收缩压≥140mmHg和（或）舒张压≥90mmHg。
          （2）低血压：收缩压≤90mmHg和（或）舒张压≤60mmHg。
        </p>
        <p>您最近的血压（舒张压）为{latestBloodPressure}mmHg</p>
      </Modal>
    </Card>
  );
};

export default BloodPressure;
