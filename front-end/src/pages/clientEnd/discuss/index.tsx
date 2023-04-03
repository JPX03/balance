import React from "react";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { Pagination, Button } from "antd-v5";

const Discuss: React.FC = () => {
  const navigate = useNavigate();
  const changePage = (url: string) => {
    navigate(url);
  };
  const list = [
    { title: "标题", content: "内容" },
    { title: "标题", content: "内容" },
    { title: "标题", content: "内容" },
    { title: "标题", content: "内容" },
    { title: "标题", content: "内容" },
    { title: "标题", content: "内容" },
  ];
  return (
    <div className={styles.root}>
      <img src="/imgs/ask.gif" className={styles.img1} alt="未加载"></img>
      <Button
        style={{ position: "absolute", left: "13.5vw", top: "30vh" }}
        shape="round"
        onClick={() => changePage("/client/ask")}
      >
        提问
      </Button>
      <div className={styles.randomAskContainer}>
        <div className={styles.randomAskTitle}>精选问答</div>
        <div className={styles.randomAskBlock1} onClick={() => changePage("/client/discussDetails")}>
          1哈哈哈
        </div>
        <div className={styles.randomAskBlock2} onClick={() => changePage("/client/discussDetails")}>
          456
        </div>
      </div>
      <div className={styles.askList}>
        <div className={styles.listTitle}>最新问答</div>
        {list.map((item) => {
          return (
            <div className={styles.askBlock} onClick={() => changePage("/client/discussDetails")}>
              <div className={styles.blockTitle}>{item.title}</div>
              <div className={styles.blockContent}>{item.content}</div>
            </div>
          );
        })}
        <Pagination defaultCurrent={1} total={50} className={styles.pagination} />
      </div>
    </div>
  );
};

export default Discuss;
