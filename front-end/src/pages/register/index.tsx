import React, { useState } from "react";

import { UserOutlined } from "@ant-design/icons";
import { Typography } from "antd-v5";
import RegisterCard from "./component/card";

import styles from "./index.module.scss";
const Register: React.FC = () => {
  const { Title } = Typography;
  const [showWhich, setShowWhich] = useState<string>("client");

  return (
    <div className={styles.root}>
      <div className={styles.headIcon}>
        <UserOutlined style={{ fontSize: "6vh" }}></UserOutlined>
      </div>
      <div className={styles.headTitle}>
        <Title level={4}>sign in/up to Banlance</Title>
      </div>
      <RegisterCard></RegisterCard>
    </div>
  );
};

export default Register;
