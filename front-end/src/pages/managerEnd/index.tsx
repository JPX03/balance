import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";

import UserList from "./users/userList";
import UserDetails from "./users/userDetails";

const { Header, Sider, Content } = Layout;

const ManagerHome: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: `100vh` }}>
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
            },
            {
              key: "home",
              icon: <HomeOutlined />,
              label: "首页",
            },
            {
              key: "user",
              icon: <UserOutlined />,
              label: "用户",
              children: [
                {
                  key: "user-List",
                  icon: <UserOutlined />,
                  label: "用户列表",
                  children: [
                    {
                      key: "user-details",
                      icon: <UserOutlined />,
                      label: "用户详情",
                    },
                  ],
                },
              ],
            },
            {
              key: "forum",
              icon: <VideoCameraOutlined />,
              label: "论坛",
              children: [
                {
                  key: "forum-List",
                  icon: <UserOutlined />,
                  label: "帖子列表",
                  children: [
                    {
                      key: "forum-details",
                      icon: <UserOutlined />,
                      label: "帖子详情",
                    },
                  ],
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
          <Button type="primary" size="small" style={{ position: "absolute", right: 40, top: 20 }}>
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
          <UserList></UserList>
          <UserDetails></UserDetails>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManagerHome;
