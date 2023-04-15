import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Card, Button, Modal, DatePicker, InputNumber } from "antd-v5";
import dayjs from "dayjs";
import { Line } from "@ant-design/plots";

const BloodSugar = () => {
  const [data, setData] = useState([]);
  const [time, setTime] = useState("");
  const [bloodSugar, setBloodSugar] = useState(0);
  const [latestBloodSuger, setLatestBloodSuger] = useState(0);
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
          item.scales = bloodSugar;
        }
      });
      if (shouldAdd) {
        list?.push({
          Date: time,
          scales: bloodSugar,
        });
      }
      fetch("http://localhost:4000/api/records/updateBloodSugar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: message.id,
          bloodSugar: JSON.stringify(list),
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.success) {
            alert("修改成功！");
            setBloodSugar(0);
            setIsModalOpen1(false);
          }
        })
        .catch(() => {
          alert("网络错误！");
        });
    }
  };
  const handleCancel1 = () => {
    setBloodSugar(0);
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
    setBloodSugar(value);
  };

  const getList = (userId) => {
    fetch("http://localhost:4000/api/records/getBloodSugarList", {
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
          setLatestBloodSuger(list[list.length - 1].scales);
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
    //   max: Math.floor(getMaxMin(data).max) + 1,
    //   min: Math.floor(getMaxMin(data).min),
    //   tickInterval: 3,
    //   tickCount: 1,
    // },
    xAxis: {
      type: "timeCat",
      tickCount: 10,
    },
  };

  return (
    <Card
      hoverable
      title="血糖(空腹)"
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
        <span>血糖(空腹)：</span>
        <InputNumber
          min={0}
          max={150}
          defaultValue={0}
          value={bloodSugar}
          onChange={onNumberChange}
          placeholder="单位kg"
        />
      </Modal>
      <Modal title="建议" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
        <p>
          血中的葡萄糖称为血糖（Glu）。葡萄糖是人体的重要组成成分，也是能量的重要来源。正常人体每天需要很多的糖来提供能量，为各种组织、脏器的正常运作提供动力。所以血糖必须保持一定的水平才能维持体内各器官和组织的需要。正常人血糖的产生和利用处于动态平衡的状态，维持在一个相对稳定的水平，这是由于血糖的来源和去路大致相同的结果。
        </p>
        <p>
          正堂的参考范围：空腹：3.92～6.16mmol/L（氧化酶法或己糖激酶法）。餐后：5.1~7.0mmol/L（氧化酶法或己糖激酶法）。
        </p>
        <p>您最近的空腹血糖为{latestBloodSuger}mmol/L</p>
      </Modal>
    </Card>
  );
};

export default BloodSugar;
