import { useState, useEffect } from "react";
import React from "react";
import { Table } from "antd";
import axios from "axios";

function App() {
  const APIBASE = "http://localhost:5555";
  const [dataA, setData] = useState([]);

  const getData = async () => {
    const url = APIBASE + "/";
    const result = await fetch(url);
    const data = result.json();
    console.log("Data", data);
  };

  useEffect(() => {
    getData();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => <a>Delete</a>,
    },
  ];
  const data = [
    {
      key: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description:
        "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
      key: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 3,
      name: "Not Expandable",
      age: 29,
      address: "Jiangsu No. 1 Lake Park",
      description: "This not expandable",
    },
    {
      key: 4,
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
    },
  ];

  return (
    <>
      <header className="stick">
        <h1>heloo this is nav</h1>
      </header>
      <div className="container m-5">
        <div className="row">
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {record.description}
                </p>
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            dataSource={data}
          />
        </div>
      </div>
    </>
  );
}

export default App;
