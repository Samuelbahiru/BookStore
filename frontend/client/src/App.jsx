import { useState, useEffect } from "react";
import React from "react";
import { Table, Modal, Button, Alert } from "antd";
import axios from "axios";
import moment from "moment";

function App() {
  const APIBASE = "http://localhost:5555/books";
  const [data, setData] = useState([]);
  const [curentRecordID, setCurrentRecordId] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState(new Date());
  const [isNew, setIsNew] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [success, setIsSuccess] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getData = async () => {
    try {
      const result = await axios.get(APIBASE);

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
      render: (text, record) => (
        <>
          <div className="row">
            <div className="col-3">
              <button
                onClick={() => {
                  viewDetail(record._id);
                }}
                className="btn btn-sm btn-outline-primary"
              >
                View Detail
              </button>
            </div>
            <div className="col-2 text-info">
              <button
                onClick={() => {
                  editTable(record._id);
                }}
                className="btn btn-sm btn-outline-info"
              >
                Edit
              </button>
            </div>
            <div className="col-2 text-danger">
              <button
                onClick={() => {
                  handleDelete(record._id);
                }}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      ),
    },
  ];

  const handleEditSubmit = async () => {
    setIsModalOpen(false);
    try {
      const res = await axios.put(APIBASE + "/update/" + curentRecordID, {
        title: title,
        author: author,
        publishYear: new Date(publishYear),
      });
      if (res) {
        getData();
      }
    } catch (err) {
      console.error("err", err);
    }
  };

  const editTable = (id) => {
    setIsEdit(true);

    data.map((record) => {
      if (record._id === id) {
        setTitle(record.title);
        setAuthor(record.author);
        const date = new Date(record.publishYear);
        setPublishYear(date);
        setCurrentRecordId(record._id);
      }
    });

    setIsModalOpen(true);
  };

  const viewDetail = (id) => {
    setIsEdit(false);

    data.map((record) => {
      if (record._id === id) {
        setTitle(record.title);
        setAuthor(record.author);
        const date = new Date(record.publishYear);
        setPublishYear(date);
      }
    });

    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(APIBASE + "/delete/" + id);
      setIsDelete(true);
      getData();
      setTimeout(() => {
        setIsDelete(false);
      }, 2000);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handlePostData = () => {
    setTitle("");
    setAuthor("");
    setPublishYear(new Date());

    setIsNew(true);
    setIsModalOpen(true);
  };

  const handlePost = async () => {
    setIsNew(false);
    setIsModalOpen(false);
    try {
      await axios.post(APIBASE + "/new", {
        title: title,
        author: author,
        publishYear: new Date(publishYear),
      });
      getData();
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Err", err);
    }
  };

  return (
    <div className="container my-4">
      {isDelete ? (
        <Alert message="Successfully deleted the record" type="success" />
      ) : (
        ""
      )}
      {success ? (
        <Alert message="Successfully Created the record" type="success" />
      ) : (
        ""
      )}
      {/* header */}
      <div className="row my-2">
        <div className="col-12 col-lg-10">
          <header className="stick bg-dark p-2">
            <h3 className="text-light text-start "> BookStore </h3>
          </header>
        </div>
      </div>
      {data ? (
        <div className="row">
          {/* <div className="col-12 col-md-2">
             
            </div> */}
          <div className="col-12 col-md-10">
            <button
              onClick={handlePostData}
              className="btn btn-primary my-1 float-end"
            >
              + Add
            </button>
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      ) : (
        ""
      )}
      {isEdit ? (
        <Modal
          title="Edit Form"
          open={isModalOpen}
          onOk={handleEditSubmit}
          onCancel={handleCancel}
        >
          <div>
            <label className="fw-bold">Title: </label>
            <input
              className="d-block my-2"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label className="fw-bold">Author: </label>
            <input
              className="d-block my-2"
              type="text"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
            <label className="fw-bold">Publish-Year: </label>
            <input
              className="d-block my-2"
              type="date"
              value={moment(publishYear).format("MMM D, YYYY")} // Format Date as "YYYY-MM-DD"
              onChange={(e) => {
                setPublishYear(e.target.value);
              }}
            />
          </div>
        </Modal>
      ) : (
        <Modal
          title="View Detail"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            <label className="fw-bold">Title: </label>
            <input
              disabled={true}
              className="d-block my-2"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label className="fw-bold">Author: </label>
            <input
              className="d-block my-2"
              disabled={true}
              type="text"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
            <label className="fw-bold">Publish-Year: </label>
            <input
              className="d-block my-2"
              disabled={true}
              type="date"
              value={moment(publishYear).format("MMM D, YYYY")} // Format Date as "YYYY-MM-DD"
              onChange={(e) => {
                setPublishYear(e.target.value);
              }}
            />
          </div>
        </Modal>
      )}
      {isNew ? (
        <Modal
          title="New Item"
          open={isModalOpen}
          onOk={handlePost}
          onCancel={handleCancel}
        >
          <div>
            <label className="fw-bold">Title: </label>
            <input
              className="d-block my-2"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label className="fw-bold">Author: </label>
            <input
              className="d-block my-2"
              type="text"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
            <label className="fw-bold">Publish-Year: </label>
            <input
              className="d-block my-2"
              type="date"
              value={publishYear} // Format Date as "YYYY-MM-DD"
              onChange={(e) => {
                setPublishYear(e.target.value);
              }}
            />
          </div>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
