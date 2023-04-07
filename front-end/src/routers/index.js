import { Navigate } from "react-router-dom";

//客户端
import ClientHome from "../pages/clientEnd";
import ClientIndex from "../pages/clientEnd/clientIndex";
import Article from "../pages/clientEnd/article";
import ArticleDetails from "../pages/clientEnd/article/details";
import Discuss from "../pages/clientEnd/discuss";
import Ask from "../pages/clientEnd/discuss/ask";
import Information from "../pages/clientEnd/information";
import Health from "../pages/clientEnd/health";

//管理员端
import ManagerHome from "../pages/managerEnd";
import ManagerIndex from "../pages/managerEnd/managerIndex";
import UserList from "../pages/managerEnd/users/userList";
import UserDetails from "../pages/managerEnd/users/userDetails";
import ForumList from "../pages/managerEnd/forums/forumList";
import ForumDetails from "../pages/managerEnd/forums/forumDetails";
import DiscussDetails from "../pages/clientEnd/discuss/details";

//登陆注册
import Register from "../pages/register";

export default [
  {
    path: "/client",
    element: <ClientHome></ClientHome>,
    children: [
      { path: "", element: <ClientIndex></ClientIndex> },
      { path: "home", element: <ClientIndex></ClientIndex> },
      { path: "article", element: <Article></Article> },
      { path: "articleDetails", element: <ArticleDetails></ArticleDetails> },
      { path: "discuss", element: <Discuss></Discuss> },
      { path: "discussDetails/:id", element: <DiscussDetails></DiscussDetails> },
      { path: "ask", element: <Ask></Ask> },
      { path: "", element: <Ask></Ask> },
      { path: "health", element: <Health></Health> },
      { path: "information", element: <Information></Information> },
    ],
  },
  {
    path: "/manager",
    element: <ManagerHome></ManagerHome>,
    children: [
      { path: "", element: <ManagerIndex></ManagerIndex> },
      { path: "home", element: <ManagerIndex></ManagerIndex> },
      { path: "userList", element: <UserList></UserList> },
      { path: "userDetails/:id", element: <UserDetails></UserDetails> },
      { path: "forumList", element: <ForumList></ForumList> },
      { path: "forumDetails", element: <ForumDetails></ForumDetails> },
    ],
  },
  { path: "/register", element: <Register></Register> },
  {
    path: "",
    element: <Navigate to="/client"></Navigate>,
  },
];
