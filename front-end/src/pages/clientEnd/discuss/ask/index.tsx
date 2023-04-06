import React, { useState } from "react";
import { Input, Button } from "antd-v5";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import styles from "./index.module.scss";

const Ask: React.FC = () => {
  const navigate = useNavigate();
  const { TextArea } = Input;
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const storage: any = window.localStorage;
  const message = JSON.parse(storage.getItem("message"));

  const changePage = (url: string) => {
    navigate(url);
  };

  const onTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const onContentChange = (e: any) => {
    setContent(e.target.value);
  };

  const cancel = () => {
    setContent("");
    setTitle("");
  };

  const addAsk = () => {
    if (title === "" || content === "") {
      alert("请将信息填写完整！");
    } else {
      const time = dayjs().format("YYYY-MM-DD HH:mm:ss");
      fetch("http://localhost:4000/api/asks/addAsk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: message.username,
          userId: message.id,
          title: title,
          content: content,
          createTime: time,
          likeNum: 0,
          commentNum: 0,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.success) {
            alert("发布成功！");
            changePage("/client/discuss");
          } else {
            alert("注册失败！");
          }
        })
        .catch(() => {
          alert("网络错误！");
        });
    }
  };

  return (
    <div className={styles.askContainer}>
      <div className={styles.title}>发布问题</div>
      <Input showCount maxLength={20} onChange={(e) => onTitleChange(e)} style={{ marginTop: "5vh" }} value={title} />
      <TextArea
        showCount
        maxLength={300}
        onChange={(e) => onContentChange(e)}
        value={content}
        style={{ marginTop: "5vh", height: "40vh" }}
      />
      <Button
        shape="round"
        style={{ marginTop: "5vh", marginRight: "2vw" }}
        onClick={() => {
          cancel();
        }}
      >
        取消
      </Button>
      <Button
        shape="round"
        type="primary"
        style={{ marginTop: "5vh" }}
        onClick={() => {
          addAsk();
        }}
      >
        发布
      </Button>
    </div>
  );
};

export default Ask;
