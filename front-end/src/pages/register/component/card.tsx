import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Card, Input, Button, Space, InputNumber, Select } from "antd-v5";
import { UserOutlined, UsergroupAddOutlined, UserAddOutlined } from "@ant-design/icons";

const RegisterCard: React.FC = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<string>("user");
  const [account, setAccount] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [gender, setGender] = useState<string>("male");
  const [age, setAge] = useState<any>();
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  //跳转页面
  const changePage = (url: string) => {
    navigate(url);
  };
  //登录身份切换
  const changeType = (type: string) => {
    setType(type);
    setAccount("");
    setUsername("");
    setPassword("");
    setGender("male");
    setAge(1);
  };
  //账号信息
  const changeAccount = (account: string) => {
    setAccount(account);
  };
  //用户名信息
  const changeUsername = (username: string) => {
    setUsername(username);
  };
  //修改性别
  const changeGender = (gender: string) => {
    setGender(gender);
  };
  //修改年龄
  const changeAge = (age: number) => {
    setAge(age);
  };
  //密码信息
  const changePassword = (password: string) => {
    setPassword(password);
  };

  //登录或注册请求
  const sendMessage = () => {
    if (type === "signUp") {
      if (account == "" || username == "" || password == "") {
        alert("请将信息填写完整！");
      } else {
        const time = dayjs().format("YYYY-MM-DD");
        fetch("http://localhost:4000/api/users/addUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            account: account,
            username: username,
            gender: gender,
            age: age,
            password: password,
            createTime: time,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (res.success) {
              alert("创建成功！");
              changePage("/client/home");
            } else {
              alert("用户名重复！");
            }
          })
          .catch((err) => {
            alert("网络错误！");
          });
      }
    }
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
      <div>
        <div style={{ marginBottom: "1vh" }}>账号：</div>
        <Input
          size="middle"
          value={account}
          prefix={
            type === "user" ? <UserOutlined /> : type === "manager" ? <UsergroupAddOutlined /> : <UserAddOutlined />
          }
          style={{ marginBottom: "2vh" }}
          onChange={(e) => changeAccount(e.target.value)}
        />
      </div>

      {/*用户名模块*/}
      {type === "signUp" ? (
        <div>
          <div style={{ marginBottom: "1vh" }}>用户名：</div>
          <Input
            size="middle"
            value={username}
            style={{ marginBottom: "2vh" }}
            onChange={(e) => changeUsername(e.target.value)}
          />
          <div style={{ marginBottom: "1vh" }}>性别：</div>
          <Select
            defaultValue="lucy"
            style={{ marginBottom: "2vh" }}
            onChange={(value) => changeGender(value)}
            value={gender}
            options={[
              { value: "male", label: "男" },
              { value: "famale", label: "女" },
            ]}
          />
          <div style={{ marginBottom: "1vh" }}>年龄：</div>
          <InputNumber
            min={1}
            size="middle"
            value={age}
            defaultValue={1}
            style={{ marginBottom: "2vh" }}
            onChange={(e) => changeAge(e)}
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
        {type === "signUp" ? "注册" : "登录"}
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
