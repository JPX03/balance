import React, { useState, useEffect } from "react";
import { Col, Row, Button, Modal, Input, Pagination } from "antd-v5";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

const Information: React.FC = () => {
  const navigate = useNavigate();
  const storage: any = window.localStorage;
  const message = JSON.parse(storage.getItem("message"));
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [curPage, setCurPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);
  const [list, setList] = useState<any>([]);

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
        userId: message.id,
        curPage: curPage,
        number: number,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.success) {
          setTotal(res.total);
          res.data?.forEach((item: any) => {
            item.key = item._id;
          });
          setList(res.data);
        } else {
          setList([]);
        }
      })
      .catch(() => {
        alert("网络错误！");
      });
  };
  const changePage = (url: string) => {
    navigate(url);
  };
  //用户名信息
  const changeUsername = (username: string) => {
    setUsername(username);
  };
  //密码信息
  const changePassword = (password: string) => {
    setPassword(password);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (username === "" || password === "") {
      alert("请将信息填写完整！");
    } else {
      fetch("http://localhost:4000/api/users/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: message.id,
          username: username,
          password: password,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.success) {
            message.username = username;
            storage.removeItem("message");
            storage.setItem("message", JSON.stringify(message));
            alert("修改成功！");
            setIsModalOpen(false);
          }
        })
        .catch(() => {
          alert("网络出错！");
        });
    }
  };

  const handleCancel = () => {
    setPassword("");
    setUsername("");
    setIsModalOpen(false);
  };
  const signOut = () => {
    storage.removeItem("message");
    navigate("/client/home");
  };
  useEffect(() => {
    getList(curPage, 6);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        {message?.gender == "male" ? (
          <img className={styles.img} alt="性别" src="/imgs/male.png"></img>
        ) : (
          <img className={styles.img} alt="性别" src="/imgs/famale.png"></img>
        )}
        <div className={styles.name}>{message?.username}</div>
        <Row align="middle" justify="center" style={{ marginTop: "3vh" }}>
          <Col span={9}></Col>
          <Col span={3} className={styles.edit} push={1}>
            <Button shape="round" size="small" style={{ fontFamily: "PingFangSCExtraLight" }} onClick={showModal}>
              编辑
            </Button>
          </Col>
          <Col span={3} className={styles.quit} push={1}>
            <Button
              shape="round"
              size="small"
              style={{ fontFamily: "PingFangSCExtraLight" }}
              onClick={() => {
                signOut();
              }}
            >
              退出
            </Button>
          </Col>
          <Col span={9}></Col>
        </Row>
      </div>
      <div className={styles.askList}>
        <div className={styles.listTitle}>我的讨论</div>
        {list.length === 0 ? (
          <div>暂未发布</div>
        ) : (
          list?.map((item: any) => {
            return (
              <div className={styles.askBlock} onClick={() => changePage("/client/discussDetails")}>
                <div className={styles.blockTitle}>{item.title}</div>
                <div className={styles.blockContent}>{item.content}</div>
              </div>
            );
          })
        )}
        <Pagination
          defaultCurrent={1}
          total={total}
          className={styles.pagination}
          onChange={(page) => {
            onPageChange(page);
          }}
        />
      </div>
      <Modal title="修改信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div style={{ marginBottom: "1vh" }}>新用户名：</div>
        <Input
          size="middle"
          value={username}
          style={{ marginBottom: "2vh" }}
          onChange={(e) => changeUsername(e.target.value)}
        />
        <div style={{ marginBottom: "1vh" }}>新密码：</div>
        <Input.Password
          // placeholder="input password"
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          size="middle"
          value={password}
          style={{ marginBottom: "2vh" }}
          onChange={(e) => changePassword(e.target.value)}
        />
      </Modal>
      <div className={styles.body}></div>
    </div>
  );
};

export default Information;
