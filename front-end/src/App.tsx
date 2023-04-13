import React, { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routers";

const App: React.FC = () => {
  const element = useRoutes(routes);
  window.scrollTo(0, 0);
  return (
    <div style={{ width: "100vw", overflow: "hidden" }}>
      <div>{element}</div>
    </div>
  );
};

export default App;
