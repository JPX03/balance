import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Typography } from "antd-v5";

const ManagerIndex: React.FC = () => {
  const { Meta } = Card;
  const { Title } = Typography;
  const navigate = useNavigate();
  const changePage = (url: string) => {
    navigate(url);
  };

  return (
    <div>
      <Title>欢迎登陆balance管理员系统</Title>
      <Row style={{ marginTop: "10vh" }}>
        <Col span={9}>
          <div
            onClick={() => {
              changePage("/manager/userList");
            }}
          >
            <Card hoverable style={{ width: 240 }} cover={<img alt="user" src="/imgs/user.webp" />}>
              <Meta title="用户管理" description="在这里对用户信息进行维护" />
            </Card>
          </div>
        </Col>
        <Col span={9}>
          <div
            onClick={() => {
              changePage("/manager/forumList");
            }}
          >
            <Card hoverable style={{ width: 240 }} cover={<img alt="forum" src="/imgs/forum.png" />}>
              <Meta title="论坛管理" description="在这里对论坛信息进行维护" />
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ManagerIndex;
