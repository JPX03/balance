import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { Pagination, Button } from "antd-v5";

const Discuss: React.FC = () => {
  const navigate = useNavigate();
  const [curPage, setCurPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);
  const [list, setList] = useState<any>([]);
  const [twoAsk, setTwoAsk] = useState<any>([]);

  //分页功能
  const onPageChange = (page: number) => {
    setCurPage(page);
  };
  const getList = (curPage: number, number: number) => {
    fetch("http://localhost:4000/api/asks/getList", {
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
  const changePage = (url: string, id: string) => {
    navigate(url, { state: { id } });
  };

  const getTwoAsk = (curPage: number, number: number) => {
    fetch("http://localhost:4000/api/asks/getList", {
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
        if (res.success) {
          setTwoAsk(res.data);
        } else {
          setTwoAsk([]);
        }
      })
      .catch(() => {
        alert("网络错误！");
      });
  };

  const storage = window.localStorage;
  useEffect(() => {
    getTwoAsk(1, 2);
    getList(curPage, 6);
  }, []);

  return (
    <div className={styles.root}>
      <img src="/imgs/ask.gif" className={styles.img1} alt="未加载"></img>
      <Button
        style={{ position: "absolute", left: "13.5vw", top: "30vh" }}
        shape="round"
        onClick={() => {
          if (!storage.getItem("message")) {
            alert("请先登录！");
          } else {
            navigate("/client/ask");
          }
        }}
      >
        提问
      </Button>
      <div className={styles.randomAskContainer}>
        <div className={styles.randomAskTitle}>精选问答</div>
        <div
          className={styles.randomAskBlock1}
          onClick={() => changePage(`/client/discussDetails/${twoAsk[0]?._id}`, twoAsk[0]?._id)}
        >
          {twoAsk[0]?.title}
        </div>
        <div
          className={styles.randomAskBlock2}
          onClick={() => changePage(`/client/discussDetails/${twoAsk[1]._id}`, twoAsk[1]._id)}
        >
          {twoAsk[1]?.title}
        </div>
      </div>
      <div className={styles.askList}>
        <div className={styles.listTitle}>最新问答</div>
        {list?.map((item: any) => {
          return (
            <div className={styles.askBlock} onClick={() => changePage(`/client/discussDetails/${item._id}`, item._id)}>
              <div className={styles.blockTitle}>{item.title}</div>
              <div className={styles.blockContent}>{item.content}</div>
            </div>
          );
        })}
        <Pagination
          defaultCurrent={1}
          total={total}
          className={styles.pagination}
          onChange={(page) => {
            onPageChange(page);
          }}
        />
      </div>
    </div>
  );
};

export default Discuss;
