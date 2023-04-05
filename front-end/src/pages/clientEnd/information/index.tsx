import React, { useState } from "react";
import { Col, Row, Button } from "antd-v5";
import styles from "./index.module.scss";

const Information: React.FC = () => {
  const [sex, setSex] = useState<string>("male");
  const [name, SetName] = useState<string>("哈哈哈");

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        {sex == "male" ? (
          <img className={styles.img} alt="性别" src="/imgs/male.png"></img>
        ) : (
          <img className={styles.img} alt="性别" src="/imgs/famale.png"></img>
        )}
        <div className={styles.name}>{name}</div>
        <Row align="middle" justify="center" style={{ marginTop: "3vh" }}>
          <Col span={9}></Col>
          <Col span={3} className={styles.edit} push={1}>
            <Button shape="round" size="small" style={{ fontFamily: "PingFangSCExtraLight" }}>
              编辑
            </Button>
          </Col>
          <Col span={3} className={styles.quit} push={1}>
            <Button shape="round" size="small" style={{ fontFamily: "PingFangSCExtraLight" }}>
              退出
            </Button>
          </Col>
          <Col span={9}></Col>
        </Row>
      </div>
      <div className={styles.body}></div>
    </div>
  );
};

export default Information;
