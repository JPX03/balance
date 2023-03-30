import { Navigate } from "react-router-dom";
import ManagerHome from "../pages/managerEnd";
import ClientHome from "../pages/clientEnd";
import ClientIndex from "../pages/clientEnd/clientIndex";
import Article from "../pages/clientEnd/article";
import Discuss from "../pages/clientEnd/discuss";
import Information from "../pages/clientEnd/information";
import Health from "../pages/clientEnd/health";

export default [
  {
    path: "/manager",
    element: <ManagerHome></ManagerHome>,
  },
  {
    path: "/client",
    element: <ClientHome></ClientHome>,
    children: [
      { path: "", element: <ClientIndex></ClientIndex> },
      { path: "home", element: <ClientIndex></ClientIndex> },
      { path: "article", element: <Article></Article> },
      { path: "discuss", element: <Discuss></Discuss> },
      { path: "health", element: <Health></Health> },
      { path: "information", element: <Information></Information> },
    ],
  },
  {
    path: "/",
    element: <ClientHome></ClientHome>,
  },
];
