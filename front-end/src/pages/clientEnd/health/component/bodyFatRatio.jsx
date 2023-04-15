import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Card, Button, Modal, DatePicker, InputNumber } from "antd-v5";
import dayjs from "dayjs";
import { Line } from "@ant-design/plots";

const BodyFatRatio = () => {
  const [data, setData] = useState([]);
  const [time, setTime] = useState("");
  const [bodyFatRatio, setBodyFatRatio] = useState(0);
  const [latestBodyFatRatio, setLatestBodyFatRatio] = useState(0);
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
          item.scales = bodyFatRatio;
        }
      });
      if (shouldAdd) {
        list?.push({
          Date: time,
          scales: bodyFatRatio,
        });
      }
      fetch("http://localhost:4000/api/records/updateBodyFatRatio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: message.id,
          bodyFatRatio: JSON.stringify(list),
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.success) {
            alert("修改成功！");
            setBodyFatRatio(0);
            setIsModalOpen1(false);
          }
        })
        .catch(() => {
          alert("网络错误！");
        });
    }
  };
  const handleCancel1 = () => {
    setBodyFatRatio(0);
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
    setBodyFatRatio(value);
  };

  const getList = (userId) => {
    fetch("http://localhost:4000/api/records/getBodyFatRatioList", {
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
          setLatestBodyFatRatio(list[list.length - 1].scales);
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
    //   max: getMaxMin(data).max + 0.1,
    //   min: getMaxMin(data).min - 0.1,
    //   tickInterval: 0.2,
    //   tickCount: 0.01,
    // },
    xAxis: {
      type: "timeCat",
      tickCount: 10,
    },
  };

  return (
    <Card
      hoverable
      title="体脂率"
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
        <span>体脂：</span>
        <InputNumber
          min={0}
          max={1}
          defaultValue={0}
          value={bodyFatRatio}
          onChange={onNumberChange}
          placeholder="单位kg"
        />
      </Modal>
      <Modal title="建议" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
        <p>
          体脂率是指人体内脂肪重量在人体总体重中所占的比例，又称体脂百分数，它反映人体内脂肪含量的多少。肥胖会提高罹患各种疾病的风险。例如，高血压、糖尿病、高血脂等。而打算怀孕的女性也不能忽视肥胖引起的妊娠并发症与难产的风险。
        </p>
        <p>
          成年人的体脂率正常范围分别是女性20%～25%，男性15%～18%，若体脂率过高，体重超过正常值的20%以上就可视为肥胖。运动员的体脂率可随运动项目而定。一般男运动员为7%～15%，女运动员为12%—25%。
        </p>
        <p>你最近的体脂率为：{latestBodyFatRatio}</p>
        {message?.gender == "male" ? (
          <p>
            {latestBodyFatRatio < 0.15
              ? "您需要适当增加体脂"
              : latestBodyFatRatio < 0.18
              ? "当前体脂很健康！"
              : "您需要适当降低体脂"}
          </p>
        ) : (
          <p>
            {latestBodyFatRatio < 0.2
              ? "您需要适当增加体脂"
              : latestBodyFatRatio < 0.25
              ? "当前体脂很健康！"
              : "您需要适当降低体脂"}
          </p>
        )}
      </Modal>
    </Card>
  );
};

export default BodyFatRatio;
