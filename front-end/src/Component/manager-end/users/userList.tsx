import React, { useState, useRef } from "react";
import { Space, Table, Tag, Button, Input } from "antd";
import type { InputRef } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";

interface DataType {
  key: string;
  userName: string;
  account: string;
  gender: string;
  createTime: string;
}

const data: DataType[] = [
  {
    key: "1",
    userName: "John Brown",
    gender: "famale",
    account: "107450",
    createTime: "2022-12-05",
  },
  {
    key: "2",
    userName: "Jim Green",
    gender: "male",
    account: "107451",
    createTime: "2022-12-05",
  },
  {
    key: "3",
    userName: "Joe Black",
    gender: "male",
    account: "107452",
    createTime: "2022-12-05",
  },
];

type DataIndex = keyof DataType;

const UserList: React.FC = () => {
  //设置当前页面
  const [curPage, setCurPage] = useState<number>(1);

  //设置搜索功能
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            搜索
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            重置
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  //配置table
  const columns: ColumnsType<DataType> = [
    {
      title: "用户名",
      dataIndex: "userName",
      key: "userName",
      render: (name) => <Button type="link">{name}</Button>,
      ...getColumnSearchProps("userName"),
    },
    {
      title: "性别",
      key: "gender",
      dataIndex: "gender",
      render: (gender) => {
        return gender == "famale" ? <Tag color="pink">女</Tag> : <Tag color="blue">男</Tag>;
      },
    },
    {
      title: "账号",
      dataIndex: "account",
      key: "account",
      ...getColumnSearchProps("account"),
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
          <Button type="link">详情</Button>
          <Button type="link" danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  //分页功能
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

  return <Table columns={columns} dataSource={data} pagination={paginationProps} />;
};

export default UserList;
