import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Col, Row } from "antd";

import "./index.css";
const ClientHome = () => {
  return (
    <div id="container">
      <div id="top">
        <Row>
          <Col span={8}>
            <NavLink to="home">主页</NavLink>
          </Col>
          <Col span={4}>
            <NavLink to="article">科普</NavLink>
          </Col>
          <Col span={4}>
            <NavLink to="discuss">论坛</NavLink>
          </Col>
          <Col span={4}>
            <NavLink to="data">数据</NavLink>
          </Col>
          <Col span={4}>
            <NavLink to="information">我的</NavLink>
          </Col>
        </Row>
      </div>
      <Outlet></Outlet>
      <div id="foot">foot</div>
    </div>
  );
};

export default ClientHome;
