import React, { useState } from "react";

import { Col, Row, Button } from "antd-v5";
import RegisterCard from "./component/card";

import styles from "./index.module.scss";
const Register: React.FC = () => {
  const [showWhich, setShowWhich] = useState<string>("client");
  const changeWhich = (name: string) => {
    setShowWhich(name);
  };

  return (
    <div className={styles.root}>
      <div className="container">
        <Row>
          <Col span={8} push={5}>
            <Button
              shape="round"
              type="primary"
              size="large"
              style={{ width: "20vh" }}
              onClick={() => changeWhich("client")}
              ghost
            >
              我是用户
            </Button>
          </Col>
          <Col span={8} push={3}>
            <Button
              shape="round"
              type="primary"
              size="large"
              style={{ width: "20vh" }}
              onClick={() => changeWhich("manager")}
              ghost
            >
              我是管理员
            </Button>
          </Col>
          <Col span={8} push={1}>
            <Button
              shape="round"
              type="primary"
              size="large"
              style={{ width: "20vh" }}
              onClick={() => changeWhich("signUp")}
              ghost
            >
              注册
            </Button>
          </Col>
          <RegisterCard type={showWhich}></RegisterCard>
        </Row>
      </div>
    </div>
  );
};

export default Register;
