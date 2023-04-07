import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, Button, Modal, Input } from "antd-v5";
import styles from "./index.module.scss";

const DiscussDetails: React.FC = () => {
  const params = useLocation();
  const askId = params.state.id;
  const { TextArea } = Input;
  const [oneAsk, setOneAsk] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getOneAsk = (askId: string) => {
    fetch("http://localhost:4000/api/asks/getDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        askId: askId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.success) {
          setOneAsk(res.data);
        } else {
          setOneAsk({});
        }
      })
      .catch(() => {
        alert("网络错误！");
      });
  };

  useEffect(() => {
    getOneAsk(askId);
  }, []);

  return (
    <div className={styles.root}>
      <Card
        title={oneAsk?.title}
        extra={
          <Button type="primary" onClick={showModal}>
            评论
          </Button>
        }
        style={{ marginBottom: "10vh" }}
      >
        <div style={{ marginBottom: "5vh", fontSize: "1vh", height: "2vh" }}>
          <img alt="用户头像" src="/imgs/male.png" style={{ height: "100%" }}></img>
          <span style={{ lineHeight: "2vh", height: "2vh" }}>{oneAsk?.username}</span>
        </div>
        <div style={{ marginBottom: "2vh", fontSize: "2vh" }}>{oneAsk?.content}</div>
      </Card>
      <Modal title="发表评论" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
      </Modal>
      <Card title="评论区"></Card>
    </div>
  );
};

export default DiscussDetails;
