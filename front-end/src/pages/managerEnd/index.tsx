import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  WechatOutlined,
  HomeOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd-v5";

const { Header, Sider, Content } = Layout;

const ManagerHome: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const storage = window.localStorage;
  const changePage = (url: string) => {
    navigate(url);
  };

  return (
    <Layout style={{ minHeight: `100vh`, overflow: "hidden", marginBottom: "5vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
        <Menu
          style={{ color: "white" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "logo",
              icon: <AliwangwangOutlined />,
              label: "balance管理系统",
              onClick: () => {
                changePage("/manager/home");
              },
            },
            {
              key: "home",
              icon: <HomeOutlined />,
              label: "首页",
              onClick: () => {
                changePage("/manager/home");
              },
            },
            {
              key: "user",
              icon: <UserOutlined />,
              label: "用户",
              children: [
                {
                  key: "userList",
                  icon: <UserOutlined />,
                  label: "用户列表",
                  onClick: () => {
                    changePage("/manager/userList");
                  },
                },
              ],
            },
            {
              key: "forum",
              icon: <WechatOutlined />,
              label: "论坛",
              children: [
                {
                  key: "forumList",
                  icon: <UserOutlined />,
                  label: "帖子列表",
                  onClick: () => {
                    changePage("/manager/forumList");
                  },
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, backgroundColor: "white" }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          })}
          <Button
            type="primary"
            size="small"
            style={{ position: "absolute", right: 40, top: 20 }}
            onClick={() => {
              storage.removeItem("message");
              changePage("/client/home");
            }}
          >
            退出
          </Button>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManagerHome;
