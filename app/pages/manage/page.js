"use client";

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../libs/firebase";
import {
  message,
  Modal,
  Button,
  Input,
  Form,
  Select,
  Spin,
  Table,
  Popconfirm,
  Card,
} from "antd";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import Header from "../../components/Header";

const categories = [
  { label: "News", value: "news" },
  { label: "Law", value: "law" },
  { label: "Tourism", value: "tourism" },
  { label: "Blog", value: "blog" },
];

const Manage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [category, setCategory] = useState("news");

  // Fetch data when user logs in or category changes
  useEffect(() => {
    if (user) fetchData();
  }, [user, category]);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, category));
      const fetchedData = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ ...doc.data(), id: doc.id });
      });
      setData(fetchedData);
    } catch (error) {
      message.error("Error fetching data");
    }
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      if (editRecord) {
        await updateDoc(doc(db, category, editRecord.id), {
          ...values,
          updatedAt: new Date(),
        });
        message.success("Data updated successfully!");
      } else {
        await addDoc(collection(db, values.category), {
          ...values,

          userId: user.uid,
          createdAt: new Date(),
        });
        message.success("Data added successfully!");
      }
      fetchData();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Error saving data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, category, id));
      message.success("Data deleted successfully!");
      fetchData();
    } catch (error) {
      message.error("Error deleting data");
    }
  };

  const handleEdit = (record) => {
    setEditRecord(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditRecord(null);
  };
  console.log(data);

  const columns = [
    { title: "Title",
       dataIndex: "title",
        key: "title",
      render:(text)=>{
        return  <h1 className="font-bold">{text}</h1>
      }
      },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (images) => (
        <div className="flex gap-2">
          {images.map((image, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-20 h-20 object-cover"
              />
            </div>
          ))}
        </div>
      ),
    },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (loadingUser || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Card className="container max-w-7xl mx-auto p-6">
        <Select
          defaultValue={category}
          style={{ width: 200, marginBottom: "16px" }}
          onChange={(value) => setCategory(value)}
        >
          {categories.map((cat) => (
            <Select.Option key={cat.value} value={cat.value}>
              {cat.label}
            </Select.Option>
          ))}
        </Select>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          className="mb-4"
        >
          Add New Data
        </Button>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
      <Modal
        title={editRecord ? "Edit Data" : "Add New Data"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={{
            title: editRecord?.title || "",
            description: editRecord?.description || "",
            category: editRecord?.category || "news",
            imageUrl: editRecord?.imageUrl || [],
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select>
              {categories.map((cat) => (
                <Select.Option key={cat.value} value={cat.value}>
                  {cat.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Images">
            <Form.List name="imageUrl">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey }) => (
                    <Form.Item
                      key={key}
                      name={name}
                      fieldKey={fieldKey}
                      rules={[
                        {
                          required: true,
                          message: "Please input an image URL!",
                        },
                      ]}
                    >
                      <Input
                        placeholder={`Image ${key + 1} URL`}
                        className="mt-2"
                        addonAfter={
                          fields.length > 1 ? (
                            <Button danger onClick={() => remove(name)}>
                              Remove
                            </Button>
                          ) : null
                        }
                      />
                    </Form.Item>
                  ))}
                  <Button type="dashed" onClick={() => add()} block>
                    Add Image URL
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading}>
            {editRecord ? "Update Data" : "Add Data"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Manage;
