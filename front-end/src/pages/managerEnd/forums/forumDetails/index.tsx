import React, { useState } from "react";
import { Descriptions, Layout, Space, Table, Tag, Button } from "antd-v5";

const { Content } = Layout;

const ForumDetails: React.FC = () => {
  return (
    <Layout>
      <Content style={{ background: "white", padding: 20, marginBottom: 20 }}>
        <Descriptions title="帖子信息">
          <Descriptions.Item label="标题">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="发帖人">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="发布时间">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="评论数">12</Descriptions.Item>
          <Descriptions.Item label="点赞数">12</Descriptions.Item>
        </Descriptions>
      </Content>
    </Layout>
  );
};

export default ForumDetails;
