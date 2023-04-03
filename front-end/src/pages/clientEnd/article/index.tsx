import React from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd-v5";

import styles from "./index.module.scss";

const Article: React.FC = () => {
  const navigate = useNavigate();
  const changePage = (url: string) => {
    navigate(url, { replace: false });
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
      <div className={styles.randomArticleContainer}>
        <div className={styles.randomArticleTitle}>精选文章</div>
        <div className={styles.randomArticle}>
          <div className={styles.box1} onClick={() => changePage("/client/articleDetails")}>
            <img src="/imgs/article1.png" className={styles.article1} alt="未加载"></img>
            <div className={styles.description1}>坚持喝水</div>
          </div>
          <div className={styles.box2} onClick={() => changePage("/client/articleDetails")}>
            <img src="/imgs/article2.png" className={styles.article2} alt="未加载"></img>
            <div className={styles.description2}>坚持锻炼</div>
          </div>
          <div className={styles.box3} onClick={() => changePage("/client/articleDetails")}>
            <img src="/imgs/article3.png" className={styles.article3} alt="未加载"></img>
            <div className={styles.description3}>坚持早睡</div>
          </div>
        </div>
      </div>
      <div className={styles.articleListContainer}>
        <div className={styles.listTitle}>文章列表</div>
        {list.map((item) => {
          return (
            <div className={styles.articleBlock} onClick={() => changePage("/client/articleDetails")}>
              <img src="/imgs/article4.png" className={styles.article4} alt="未加载"></img>
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

export default Article;
