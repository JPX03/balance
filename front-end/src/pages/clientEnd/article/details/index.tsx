import React, { useState, useEffect } from "react";
import { Card } from "antd-v5";
import { useLocation } from "react-router-dom";
import styles from "./index.module.scss";

const ArticleDetails: React.FC = () => {
  const params = useLocation();
  const { id } = params.state;
  const [oneArticle, setOneArticle] = useState<any>([]);
  const getDetails = (articleId: string) => {
    fetch("http://localhost:4000/api/articles/getDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        articleId: articleId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.success) {
          setOneArticle(res.data);
        } else {
          setOneArticle({});
        }
      })
      .catch(() => {
        alert("网络错误！");
      });
  };
  useEffect(() => {
    getDetails(id);
  }, []);
  return (
    <div className={styles.root}>
      <Card
        title={oneArticle?.title}
        bordered={false}
        style={{ width: "70%", margin: "0 auto", marginTop: "10vh", marginBottom: "5vh" }}
      >
        <p>时间：{oneArticle?.createTime}</p>
        <p>来源：{oneArticle?.source}</p>
        <p>{oneArticle?.content}</p>
      </Card>
    </div>
  );
};

export default ArticleDetails;
