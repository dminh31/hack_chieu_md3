import React, { useEffect, useState } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import publicAxios from '../config/publicAxios';
import privateAxios from '../config/privateAxios';
import { successNoti, failedNoti } from '../config/noti.js'
import { notification } from 'antd'

export default function Todo() {
  const [data, setData] = useState([])
  const [input, setInput] = useState({
    name: ""
  })
  const handleAdd = async () => {
    if (!input.id) {
      try {
        const response = await privateAxios.post("/todo/add", input);
        successNoti(response.data.message);
        setInput({
          name: "",
        });
        handleGetData()
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      try {
        const response = await privateAxios.put(`/todo/${input.id}`, input);
        successNoti(response.data.message)
        handleGetData()
        setInput({
          name: "",
        });
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  }
  const handleGetData = async () => {
    const res = await publicAxios.get("/todo/all")
    console.log(res.data.role);
    setData(res.data)
  }
  const handleDelete = async (id) => {
    try {
      if (confirm("Ban co muon xoa khong?")) {
        const res = await privateAxios.delete(`/todo/${id}`)
        handleGetData()
        successNoti(res.data.message)
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const handleEdit = (item) => {
    setInput({ ...item, name: item.nameProduct })
  }

  useEffect(() => {
    handleGetData()
  }, [])
  return (
    <div
      style={{ backgroundColor: "rgb(0,250,250)", padding: 30, height: 1000 }}
    >
      <div
        style={{
          width: 600,
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <h1 style={{ textAlign: "center", marginTop: 20 }}> Todo List</h1>
        <div
          style={{
            display: "flex",
            marginBottom: 20,
            marginTop: 20,
            width: 550,
            marginLeft: 25,
          }}
        >
          <Form.Control
            type="text"
            placeholder="Nhap ten"
            onChange={(e) => setInput({ ...input, name: e.target.value })}
            name="name"
            value={input.name}
          />

          <Button
            variant="info"
            style={{ fontSize: 20, fontWeight: 700, marginLeft: 15 }}
            onClick={handleAdd}
          >
            {input.id ? "Sua" : "Them"}
          </Button>

        </div>
        {data?.map((item, key) => {
          return (
            <div
              key={key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: 550,
                margin: "0 auto",
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  width: 300,
                  marginTop: 10, fontSize: 20, fontWeight: 500, color: "rgb(255,128,0)",
                  textDecoration: `${item.status == "complete" ? "line-through" : "none"
                    }`,
                }}
              >
                {item.nameProduct}
              </p>
              <p style={{ marginTop: 10, fontSize: 15, fontWeight: 500 }}>{item.status}</p>
              <div
                style={{
                  width: 150,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={() => handleEdit(item)}
                  style={{
                    visibility: `${item.status == "complete" ? "hidden" : "visbility"
                      }`,
                  }}
                  variant="rgb(255,182,193)"
                >
                  {" "}
                  <img
                    width={30}
                    src="https://cdn.icon-icons.com/icons2/1558/PNG/512/353430-checkbox-edit-pen-pencil_107516.png"
                    alt=""
                  />
                </Button>
                <Button onClick={() => handleDelete(item.id)} variant="dark">
                  <img
                    width={30}
                    src="https://cdn.icon-icons.com/icons2/1880/PNG/96/iconfinder-trash-4341321_120557.png"
                    alt=""
                  />
                </Button>
              </div>
            </div>
          );
        })}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 550,
            margin: "0 auto",
            paddingBottom: 20,
            fontWeight: 500,
            fontSize: 20
          }}
        >
          <p style={{ fontSize: 20 }}>You have <span style={{ color: "tomato" }}>{data?.length}</span> pending task</p>
        </div>
      </div>
    </div>


  )
}
