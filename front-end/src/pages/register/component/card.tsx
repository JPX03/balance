import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button, Space } from "antd-v5";
import { UserOutlined, UsergroupAddOutlined, UserAddOutlined } from "@ant-design/icons";

const RegisterCard: React.FC = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<string>("user");
  const [account, setAccount] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const changePage = (url: string) => {
    navigate(url);
  };
  const changeType = (type: string) => {
    setType(type);
    setAccount("");
    setUserName("");
    setPassword("");
  };
  const changeAccount = (account: string) => {
    setAccount(account);
  };
  const changeUserName = (userName: string) => {
    setUserName(userName);
  };
  const changePassword = (password: string) => {
    setPassword(password);
  };
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const sendMessage = () => {
    if (type === "signUp") {
      fetch("http://locolhost:4000/users/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
      });
    }
    console.log(type, account, userName, password);
  };
  return (
    <Card
      title={
        <Space>
          <Button
            size="small"
            type="link"
            onClick={() => {
              changeType("user");
            }}
          >
            用户登录
          </Button>
          <Button
            size="small"
            type="link"
            onClick={() => {
              changeType("manager");
            }}
          >
            管理员登陆
          </Button>
          <Button
            size="small"
            type="link"
            onClick={() => {
              changeType("signUp");
            }}
          >
            注册
          </Button>
        </Space>
      }
      bordered={true}
      style={{ width: "24vw", margin: "0 auto", marginTop: "2vh", backgroundColor: "#f6f8fa" }}
    >
      {/*账号模块*/}
      {type == "user" ? (
        <div>
          <div style={{ marginBottom: "1vh" }}>账号：</div>
          <Input
            size="middle"
            value={account}
            prefix={<UserOutlined />}
            style={{ marginBottom: "2vh" }}
            onChange={(e) => changeAccount(e.target.value)}
          />
        </div>
      ) : type == "manager" ? (
        <div>
          <div style={{ marginBottom: "1vh" }}>账号：</div>
          <Input
            size="middle"
            value={account}
            prefix={<UsergroupAddOutlined />}
            style={{ marginBottom: "2vh" }}
            onChange={(e) => changeAccount(e.target.value)}
          />
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: "1vh" }}>账号：</div>
          <Input
            size="middle"
            value={account}
            prefix={<UserAddOutlined />}
            style={{ marginBottom: "2vh" }}
            onChange={(e) => changeAccount(e.target.value)}
          />
        </div>
      )}

      {/*用户名模块*/}
      {type == "signUp" ? (
        <div>
          <div style={{ marginBottom: "1vh" }}>用户名：</div>
          <Input
            size="middle"
            value={userName}
            style={{ marginBottom: "2vh" }}
            onChange={(e) => changeUserName(e.target.value)}
          />
        </div>
      ) : null}

      {/*密码模块*/}
      <div style={{ marginBottom: "1vh" }}>密码：</div>
      <Input.Password
        // placeholder="input password"
        visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
        size="middle"
        value={password}
        style={{ marginBottom: "2vh" }}
        onChange={(e) => changePassword(e.target.value)}
      />
      <Button
        style={{ width: "100%", backgroundColor: "#2da44e", marginBottom: "2vh" }}
        type="primary"
        onClick={() => sendMessage()}
      >
        {type == "signUp" ? "注册" : "登录"}
      </Button>
      <Button
        style={{ width: "100%", backgroundColor: "#2da44e" }}
        type="primary"
        onClick={() => changePage("/client")}
      >
        返回首页
      </Button>
    </Card>
  );
};

export default RegisterCard;
