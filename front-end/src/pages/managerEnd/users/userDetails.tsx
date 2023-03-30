import React, { useState } from "react";
import { Descriptions, Layout, Space, Table, Tag, Button } from "antd-v5";
import type { ColumnsType } from "antd-v5/es/table";

const { Content } = Layout;

interface DataType {
  key: string;
  title: string;
  createTime: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "贴子标题",
    dataIndex: "title",
    key: "title",
    render: (title) => <Button type="link">{title}</Button>,
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button type="link" danger>
          删除
        </Button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    title: "John Brown",
    createTime: "2022-12-05",
  },
  {
    key: "2",
    title: "Jim Green",
    createTime: "2022-12-05",
  },
  {
    key: "3",
    title: "Joe Black",
    createTime: "2022-12-05",
  },
];

const UserDetails: React.FC = () => {
  const [curPage, setCurPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurPage(page);
  };

  const paginationProps = {
    current: curPage, //当前页码
    pageSize: 10,
    total: 3,
    onChange: (page: number) => handlePageChange(page), //改变页码的函数
    hideOnSinglePage: false,
    showSizeChanger: false,
  };

  return (
    <Layout>
      <Content style={{ background: "white", padding: 20, marginBottom: 20 }}>
        <Descriptions title="用户信息">
          <Descriptions.Item label="用户名">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="性别">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="账号">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="密码">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="电话">1810000000</Descriptions.Item>
          <Descriptions.Item label="发帖数">Zhou Maomao</Descriptions.Item>
        </Descriptions>
      </Content>
      <Content style={{ background: "white", padding: 20 }}>
        <h3 style={{ marginLeft: 5 }}>发帖</h3>
        <Table columns={columns} dataSource={data} pagination={paginationProps} />
      </Content>
    </Layout>
  );
};

export default UserDetails;
