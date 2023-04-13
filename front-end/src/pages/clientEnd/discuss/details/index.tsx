import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { Card, Button, Modal, Input, Divider, Pagination } from "antd-v5";
import styles from "./index.module.scss";

const DiscussDetails: React.FC = () => {
  const params = useLocation();
  const { id } = params.state;
  const storage: any = window.localStorage;
  const username = JSON.parse(storage.getItem("message")).username;
  const userId = JSON.parse(storage.getItem("message")).id;
  const { TextArea } = Input;
  const [oneAsk, setOneAsk] = useState<any>([]);
  const [list, setList] = useState<any>([]);
  const [content, setContent] = useState<string>("");
  const [curPage, setCurPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    addAnswer();
  };

  const handleCancel = () => {
    setContent("");
    setIsModalOpen(false);
  };

  const onContentChange = (e: any) => {
    setContent(e.target.value);
  };

  const onPageChange = (page: number) => {
    setCurPage(page);
    getList(page, 6, id);
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

  const addAnswer = () => {
    if (content === "") {
      alert("请输入评论");
    } else {
      const time = dayjs().format("YYYY-MM-DD HH:mm:ss");
      fetch("http://localhost:4000/api/answers/addAnswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          askId: oneAsk?._id,
          username: username,
          userId: userId,
          content: content,
          createTime: time,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.success) {
            alert("评论成功！");
            setIsModalOpen(false);
            setContent("");
            getList(curPage, 6, id);
          } else {
            alert("评论失败！");
          }
        })
        .catch(() => {
          alert("网络错误！");
        });
    }
  };

  const getList = (curPage: number, number: number, askId: string) => {
    fetch("http://localhost:4000/api/answers/getList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        curPage: curPage,
        number: number,
        askId: askId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setTotal(res.total);
        setList(res.data);
      })
      .catch(() => {
        alert("网络错误！");
      });
  };

  useEffect(() => {
    getOneAsk(id);
    getList(curPage, 6, id);
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
        <div style={{ marginBottom: "4.5vh", fontSize: "1vh", height: "2vh" }}>
          <img alt="用户头像" src="/imgs/male.png" style={{ height: "100%" }}></img>
          <span style={{ lineHeight: "2vh", height: "2vh" }}>{oneAsk?.username}</span>
        </div>
        <div style={{ marginBottom: "2vh", fontSize: "2vh" }}>{oneAsk?.content}</div>
      </Card>
      <Modal title="发表评论" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <TextArea
          rows={4}
          placeholder="maxLength is 6"
          maxLength={100}
          value={content}
          onChange={(e) => onContentChange(e)}
        />
      </Modal>
      <Card title="评论区">
        {list?.map((item: any) => {
          return (
            <div>
              <div style={{ marginBottom: "2vh", fontSize: "1vh", height: "2vh" }}>
                <img alt="用户头像" src="/imgs/male.png" style={{ height: "100%" }}></img>
                <span style={{ lineHeight: "2vh", height: "1.5vh" }}>{item?.username}</span>
              </div>
              <div style={{ marginBottom: "2vh", fontSize: "1.8vh" }}>{item?.content}</div>
              <Divider></Divider>
            </div>
          );
        })}
        <Pagination
          defaultCurrent={1}
          total={total}
          current={curPage}
          onChange={(e) => {
            onPageChange(e);
          }}
          pageSize={6}
        />
      </Card>
    </div>
  );
};

export default DiscussDetails;
