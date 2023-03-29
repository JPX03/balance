import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import "./index.css";
const ClientHome = () => {
  return (
    <div id="container">
      <div id="top">
        <NavLink to="home">主页</NavLink>
        <NavLink to="discuss">论坛</NavLink>
        <NavLink to="information">个人中心</NavLink>
      </div>
      <Outlet></Outlet>
      <div id="foot">foot</div>
    </div>
  );
};

export default ClientHome;
