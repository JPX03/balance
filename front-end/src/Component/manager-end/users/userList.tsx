import React from "react";
import { Space, Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  name: string;
  account: string;
  createTime: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "用户名",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "账号",
    dataIndex: "account",
    key: "account",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button type="link">详情</Button>
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
    name: "John Brown",
    account: "107450",
    createTime: "2022-12-05",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    account: "107451",
    createTime: "2022-12-05",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    account: "107452",
    createTime: "2022-12-05",
    tags: ["cool", "teacher"],
  },
];

const UserList: React.FC = () => <Table columns={columns} dataSource={data} />;

export default UserList;
