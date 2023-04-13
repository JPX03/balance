import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd-v5";

import styles from "./index.module.scss";

const Article: React.FC = () => {
  const navigate = useNavigate();
  const [curPage, setCurPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);
  const [list, setList] = useState<any>([]);

  const getList = (curPage: number, number: number) => {
    fetch("http://localhost:4000/api/articles/getList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        curPage: curPage,
        number: number,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTotal(res.total);
        res.data?.forEach((item: any) => {
          item.key = item._id;
        });
        setList(res.data);
      })
      .catch(() => {
        alert("网络错误！");
      });
  };
  const onPageChange = (page: number) => {
    setCurPage(page);
    getList(page, 6);
  };
  const changePage = (url: string, id: string) => {
    navigate(url, { state: { id } });
  };
  useEffect(() => {
    getList(curPage, 6);
  }, []);
  return (
    <div className={styles.root}>
      <div className={styles.randomArticleContainer}>
        <div className={styles.randomArticleTitle}>精选文章</div>
        <div className={styles.randomArticle}>
          <div
            className={styles.box1}
            onClick={() =>
              changePage(`/client/articleDetails/${list[list.length - 1]?._id}`, list[list.length - 1]?._id)
            }
          >
            <img src="/imgs/article1.png" className={styles.article1} alt="未加载"></img>
            <div className={styles.description1}>
              {list[list.length - 1]?.title.length > 10
                ? list[list.length - 1]?.title.slice(0, 10) + "..."
                : list[list.length - 1]?.title}
            </div>
          </div>
          <div
            className={styles.box2}
            onClick={() =>
              changePage(`/client/articleDetails/${list[list.length - 2]?._id}`, list[list.length - 1]?._id)
            }
          >
            <img src="/imgs/article2.png" className={styles.article2} alt="未加载"></img>
            <div className={styles.description2}>
              {list[list.length - 2]?.title.length > 6
                ? list[list.length - 2]?.title.slice(0, 6) + "..."
                : list[list.length - 2]?.title}
            </div>
          </div>
          <div
            className={styles.box3}
            onClick={() =>
              changePage(`/client/articleDetails/${list[list.length - 3]?._id}`, list[list.length - 1]?._id)
            }
          >
            <img src="/imgs/article3.png" className={styles.article3} alt="未加载"></img>
            <div className={styles.description3}>
              {list[list.length - 3]?.title.length > 6
                ? list[list.length - 3]?.title.slice(0, 6) + "..."
                : list[list.length - 3]?.title}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.articleListContainer}>
        <div className={styles.listTitle}>文章列表</div>
        {list.map((item: any, index: any) => {
          console.log(index);
          return (
            <div
              className={styles.articleBlock}
              onClick={() => changePage(`/client/articleDetails/${item._id}`, item._id)}
            >
              <img src={`/imgs/article${index + 4}.webp`} className={styles.article4} alt="未加载"></img>
              <div className={styles.blockTitle}>{item.title}</div>
              <div className={styles.blockContent}>{item.content}</div>
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
          style={{ marginTop: "3vh" }}
        />
      </div>
    </div>
  );
};

export default Article;
