"use client"
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from '../../libs/firebase';
import { message, Modal, Button, Input, Form, Select, Upload, Spin, Table, Popconfirm, Card } from 'antd';
import { addDoc, collection, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import Header from '../../components/Header';

const categories = [
  { label: 'News', value: 'news' },
  { label: 'Law', value: 'law' },
  { label: 'Tourism', value: 'tourism' },
  { label: 'Blog', value: 'blog' },
];

const Manage = () => {
  const [user, loadingUser] = useAuthState(auth); // Fetch the current user
  const [loading, setLoading] = useState(false); // State to track loading
  const [data, setData] = useState([]); // State to store fetched data
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [editRecord, setEditRecord] = useState(null); // Record being edited
  const [imageUrl, setImageUrl] = useState(null); // Image URL state for uploaded images
  const [category, setCategory] = useState('news'); // Default category

  // Fetch data when user logs in or category changes
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, category]);

  // Fetch data from Firestore based on selected category
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, category));
      const fetchedData = [];
      querySnapshot.forEach(doc => {
        fetchedData.push({ ...doc.data(), id: doc.id });
      });
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data: ', error);
      message.error('Error fetching data');
    }
  };

  // Handle form submission to create or update data
  const handleFormSubmit = async (values) => {
    setLoading(true);
    let uploadedImageUrl = imageUrl;

    if (values.image && values.image.file) {
      // If the user uploaded a new image, upload it to Firebase Storage
      const file = values.image.file.originFileObj;
      const fileRef = ref(storage, `images/${uuidv4()}_${file.name}`);
      
      try {
        await uploadBytes(fileRef, file);
        uploadedImageUrl = await getDownloadURL(fileRef); // Get the download URL of the uploaded image
      } catch (error) {
        message.error('Error uploading image');
        setLoading(false);
        return;
      }
    }

    try {
      if (editRecord) {
        // If editing an existing record, update it
        await updateDoc(doc(db, category, editRecord.id), {
          title: values.title,
          description: values.description,
          category: values.category,
          imageUrl: uploadedImageUrl || "",
          updatedAt: new Date(),
        });
        message.success('Data updated successfully!');
      } else {
        // If adding new data, create a new document
        await addDoc(collection(db, values.category), {
          title: values.title,
          description: values.description,
          category: values.category,
          userId: user.uid,
          createdAt: new Date(),
          imageUrl: uploadedImageUrl || "", // Store image URL along with other data
        });
        message.success('Data added successfully!');
      }

      fetchData(); // Refetch data
      setIsModalVisible(false); // Close modal
      setImageUrl(null); // Reset image URL state
    } catch (error) {
      message.error('Error saving data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = (file) => {
    return false; // Prevent automatic upload, we handle it manually later
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, category, id)); // Delete the document from Firestore
      message.success('Data deleted successfully!');
      fetchData(); // Refetch data after deletion
    } catch (error) {
      message.error('Error deleting data');
    }
  };

  // Modal Form for Add/Edit Data
  const handleEdit = (record) => {
    setEditRecord(record); // Set the record being edited
    setImageUrl(record.imageUrl); // Set the image URL if editing
    setIsModalVisible(true); // Show the modal
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal
    setEditRecord(null); // Reset the edit record state
    setImageUrl(null); // Reset the image URL state
  };

  // Table columns for managing data
  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </>
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
    <div >
        <Header />
      {/* Category Selection */}
      <Card  className='container max-w-7xl  mx-auto'>

      <Select
        defaultValue={category}
        style={{ width: 200, marginBottom: '16px' }}
        onChange={(value) => setCategory(value)}
      >
        {categories.map((cat) => (
          <Select.Option key={cat.value} value={cat.value}>
            {cat.label}
          </Select.Option>
        ))}
      </Select>

      {/* Add New Data Button */}
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add New Data
      </Button>

      {/* Data Table */}
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      {/* Modal Form for Add/Edit Data */}
      <Modal
        title={editRecord ? 'Edit Data' : 'Add New Data'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={{
            title: editRecord ? editRecord.title : '',
            description: editRecord ? editRecord.description : '',
            category: editRecord ? editRecord.category : 'news',
            imageUrl: editRecord ? editRecord.imageUrl : '', // Set the initial image URL if editing
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input a description!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select>
              {categories.map((category) => (
                <Select.Option key={category.value} value={category.value}>
                  {category.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Image" name="image">
            <Upload
              listType="picture"
              showUploadList={false}
              customRequest={handleImageUpload}
            >
              <Button>Upload Image</Button>
            </Upload>
            {imageUrl && <img src={imageUrl} alt="uploaded" style={{ width: '100%', marginTop: 16 }} />}
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            {editRecord ? 'Update Data' : 'Add Data'}
          </Button>
        </Form>
      </Modal>
      </Card>

    </div>
  );
};

export default Manage;
