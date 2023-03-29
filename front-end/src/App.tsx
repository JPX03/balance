import React from "react";
import { NavLink, useRoutes } from "react-router-dom";
import routes from "./routers";

const App = () => {
  const element = useRoutes(routes);
  return (
    <div>
      <div>
        <NavLink to="/client">我是用户</NavLink>
      </div>
      <div>
        <NavLink to="/manager">我是管理员</NavLink>
      </div>
      <div>{element}</div>
    </div>
  );
};

export default App;
