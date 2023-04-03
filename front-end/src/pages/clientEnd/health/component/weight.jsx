import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Card, Button, Modal, DatePicker, InputNumber, Col, Row } from "antd-v5";
import dayjs from "dayjs";
import { Line } from "@ant-design/plots";

const Weight = () => {
  const [data, setData] = useState([]);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const handleOk1 = () => {
    setIsModalOpen1(false);
  };
  const handleCancel1 = () => {
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
    if (date) {
      console.log("Date: ", date);
    } else {
      console.log("Clear");
    }
  };
  const onNumberChange = (value) => {
    console.log("changed", value);
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch("https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const config = {
    data,
    padding: "auto",
    xField: "Date",
    yField: "scales",
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
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
      <div style={{ height: "30vh", width: "100%" }}>
        <Row style={{ height: "100%", width: "100%" }}>
          <Col span={12} style={{ height: "100%", width: "100%" }}>
            <Line {...config} style={{ height: "100%", width: "96%" }} />
          </Col>
          <Col span={12} style={{ height: "100%", width: "100%" }}>
            <Line {...config} style={{ height: "100%", width: "96%" }} />
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
        <InputNumber min={0} max={200} onChange={onNumberChange} placeholder="单位kg" />
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
