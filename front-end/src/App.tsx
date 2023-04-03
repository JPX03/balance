import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routers";

const App: React.FC = () => {
  const element = useRoutes(routes);
  return (
    <div style={{ width: "100vw", overflow: "hidden" }}>
      <div>{element}</div>
    </div>
  );
};

export default App;
