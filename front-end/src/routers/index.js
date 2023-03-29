import { Navigate } from "react-router-dom";
import ManagerHome from "../pages/managerEnd";
import ClientHome from "../pages/clientEnd";
import Discuss from "../pages/clientEnd/discuss";
import Information from "../pages/clientEnd/information";
import ClientIndex from "../pages/clientEnd/clientIndex";

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
      { path: "discuss", element: <Discuss></Discuss> },
      { path: "information", element: <Information></Information> },
    ],
  },
  {
    path: "/",
    element: <div>404</div>,
  },
];
