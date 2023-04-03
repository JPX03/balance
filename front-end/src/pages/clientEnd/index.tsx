import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Col, Row, Button } from "antd-v5";
import { UserOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const ClientHome: React.FC = () => {
  const [isRegister, setIsRegister] = useState<Boolean>(false);
  const navigate = useNavigate();
  const changePage = (url: string) => {
    navigate(url);
  };

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <Row justify="start" align="middle">
          <Col span={12}>
            <div className={styles.home}>
              <NavLink to="home" className={styles.title}>
                主页
              </NavLink>
            </div>
          </Col>
          <Col span={3}>
            <NavLink to="article" className={styles.title}>
              科普
            </NavLink>
          </Col>
          <Col span={3}>
            <NavLink to="discuss" className={styles.title}>
              论坛
            </NavLink>
          </Col>
          <Col span={3}>
            <NavLink to="health" className={styles.title}>
              健康
            </NavLink>
          </Col>
          <Col span={3}>
            {isRegister ? (
              <NavLink to="information">
                <Button shape="round" size="small">
                  <UserOutlined />
                  我的
                </Button>
              </NavLink>
            ) : (
              <Button shape="round" size="small" onClick={() => changePage("/register")}>
                <UserOutlined />
                登录
              </Button>
            )}
          </Col>
        </Row>
      </div>
      <Outlet></Outlet>
      <div className={styles.foot}>
        <Row justify="start" align="middle">
          <Col span={12}>
            <div className={styles.home}>
              <NavLink to="home" className={styles.title}>
                主页
              </NavLink>
            </div>
          </Col>
          <Col span={3}>
            <NavLink to="article" className={styles.title}>
              科普
            </NavLink>
          </Col>
          <Col span={3}>
            <NavLink to="discuss" className={styles.title}>
              论坛
            </NavLink>
          </Col>
          <Col span={3}>
            <NavLink to="health" className={styles.title}>
              健康
            </NavLink>
          </Col>
          <Col span={3}>
            {isRegister ? (
              <NavLink to="information" className={styles.title}>
                我的
              </NavLink>
            ) : (
              <Button shape="round" size="small" onClick={() => changePage("/register")}>
                <UserOutlined />
                登录
              </Button>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ClientHome;
