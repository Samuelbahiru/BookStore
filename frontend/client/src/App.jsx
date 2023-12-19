import { useState, useEffect } from "react";
import React from "react";
import { Table } from "antd";
import axios from "axios";

function App() {
  const APIBASE = "http://localhost:5555";
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const url = APIBASE + "/books";
      const result = await axios.get(url);

      setData(result.data);

      console.log("data", data);
    } catch (err) {
      console.error("err", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "PublishYear",
      dataIndex: "publishYear",
      key: "publishYear",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => <a>Delete</a>,
    },
  ];

  return (
    <>
      <header className="stick">
        <h1>heloo this is nav</h1>
      </header>
      {data ? (
        <div className="container m-5">
          <div className="row">
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
