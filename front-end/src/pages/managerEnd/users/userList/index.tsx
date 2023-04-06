import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Table, Tag, Button, Input } from "antd-v5";
import type { InputRef } from "antd-v5";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType, ColumnType } from "antd-v5/es/table";
import type { FilterConfirmProps } from "antd-v5/es/table/interface";

interface DataType {
  key: string;
  username: string;
  account: string;
  gender: string;
  createTime: string;
}

type DataIndex = keyof DataType;

const UserList: React.FC = () => {
  const navigate = useNavigate();

  //设置当前页面
  const [curPage, setCurPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);
  const [list, setList] = useState<DataType[]>([]);

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

  const changPage = (url: string, id: string) => {
    navigate(url, { state: { id } });
  };

  //分页功能
  const handlePageChange = (page: number) => {
    setCurPage(page);
  };

  const getList = (curPage: number, number: number) => {
    fetch("http://localhost:4000/api/users/getList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        curPage: curPage,
        number: number,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTotal(res.total);
        res.data?.forEach((item: any) => {
          item.key = item._id;
        });
        setList(res.data);
      })
      .catch(() => {
        alert("网络错误！");
      });
  };

  const deleteUser = (_: any, record: any) => {
    fetch("http://localhost:4000/api/users/deleteUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: record._id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.success) {
          alert("删除成功！");
          getList(curPage, 8);
        } else {
          alert("删除失败！");
        }
      })
      .catch(() => {
        alert("网络错误！");
      });
  };

  useEffect(() => {
    getList(curPage, 8);
  }, [curPage]);

  //配置table
  const columns: ColumnsType<DataType> = [
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            changPage(`/manager/userDetails/${record.key}`, record.key);
          }}
        >
          {record.username}
        </Button>
      ),
      ...getColumnSearchProps("username"),
    },
    {
      title: "性别",
      key: "gender",
      dataIndex: "gender",
      render: (gender) => {
        return gender === "famale" ? <Tag color="pink">女</Tag> : <Tag color="blue">男</Tag>;
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
          <Button type="link" onClick={() => changPage(`/manager/userDetails/${record.key}`, record.key)}>
            详情
          </Button>
          <Button type="link" danger onClick={() => deleteUser(_, record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const paginationProps = {
    current: curPage, //当前页码
    pageSize: 8,
    total: total,
    onChange: (page: number) => handlePageChange(page), //改变页码的函数
    hideOnSinglePage: false,
    showSizeChanger: false,
  };

  return <Table columns={columns} dataSource={list} pagination={paginationProps} />;
};

export default UserList;
