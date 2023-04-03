import React, { useState } from "react";
import { Card, Input, Button, Space } from "antd-v5";
import { UserOutlined } from "@ant-design/icons";

interface CardProps {
  type: string;
}

const RegisterCard: React.FC<CardProps> = (props) => {
  const { type } = props;
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const sendMessage = (type: string) => {};
  return (
    <Card
      title={type == "client" ? "用户登录" : type == "manager" ? "管理员登录" : "注册"}
      bordered={false}
      style={{ width: "36vw", margin: "0 auto", marginTop: "10vh", height: "60vh" }}
    >
      <br />
      <Input size="large" placeholder="账号" prefix={<UserOutlined />} />
      <br />
      <br />
      <br />
      {type == "signUp" ? (
        <div>
          {" "}
          <Input size="large" placeholder="用户名" prefix={<UserOutlined />} />
          <br />
          <br />
          <br />
        </div>
      ) : (
        <></>
      )}
      <Space direction="horizontal">
        <Input.Password
          placeholder="input password"
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
        />
        <Button style={{ width: "6vw" }} onClick={() => setPasswordVisible((prevState) => !prevState)}>
          {passwordVisible ? "Hide" : "Show"}
        </Button>
      </Space>
      <br />
      <br />
      <br />
      <Button style={{ width: "6vw", marginLeft: "13vw" }} type="primary" onClick={() => sendMessage(type)}>
        {type == "signUp" ? "注册" : "登录"}
      </Button>
    </Card>
  );
};

export default RegisterCard;
