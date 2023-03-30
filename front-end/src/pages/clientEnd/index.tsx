import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Col, Row } from "antd";

import styles from "./index.module.scss";

const ClientHome = () => {
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
              数据
            </NavLink>
          </Col>
          <Col span={3}>
            <NavLink to="information" className={styles.title}>
              我的
            </NavLink>
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
            <NavLink to="Health" className={styles.title}>
              健康
            </NavLink>
          </Col>
          <Col span={3}>
            <NavLink to="information" className={styles.title}>
              我的
            </NavLink>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ClientHome;
