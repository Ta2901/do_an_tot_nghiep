"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../libs/firebase'; // Import Firestore
import { List, Card, Spin, message } from 'antd'; // Ant Design components for displaying data
import { collection, query, getDocs } from 'firebase/firestore'; // Firestore query methods
import Image from 'next/image'; // Import next/image for optimized image loading
import './tour.css'
import Header from '@/app/components/Header';
function Tourism() {
  const [posts, setPosts] = useState(); // State to hold the fetched posts
  const [loading, setLoading] = useState(true); // State to manage loading state

  // Fetch posts from Firestore
  const fetchNewsPosts = async () => {
    setLoading(true);

    try {
      const q = query(collection(db, "tourism"));
      const querySnapshot = await getDocs(q);

      const newsPosts = [];
      querySnapshot.forEach((doc) => {
        newsPosts.push({ id: doc.id, ...doc.data() });
      });

      setPosts(newsPosts); // Set posts data
      setLoading(false); // Stop loading
    } catch (error) {
      console.error("Error fetching news posts:", error);
      message.error("Error fetching news posts");
      setLoading(false); // Stop loading on error
    }
  };

  // Use effect to fetch posts when the component mounts
  useEffect(() => {
    fetchNewsPosts(); // Fetch posts when the page loads
  }, []);

  // While data is loading, show the loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="">
      <Header/>
      <div className="flex justify-between mx-auto max-w-7xl container ">
        {/* Post list section */}
        <div style={{width:'79%'}}>
        <Card >
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="post-item flex mb-6">
                <Image
                  src={post.imageUrl || "https://via.placeholder.com/150"} // Use placeholder if no image
                  alt="Post Image"
                  width={500}
                  height={500}
                  className="mr-4 bg-slate-500"
                />
                <div>
                  <p className="font-semibold">{post.title}</p>
                  <p>{post.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </Card>
        </div>
       

        {/* Sidebar section */}
        <div style={{width:'29%'}}>
        <Card className=" pl-5">
          <h2 className="text-xl font-semibold mb-4">Danh Mục</h2>
          <div className="category mb-4">
            <h3 className="font-semibold">Du lịch nghỉ dưỡng</h3>
            <ul>
              <li>Resort và spa</li>
              <li>Du lịch biển</li>
              <li>Du lịch núi</li>
            </ul>
          </div>
          <div className="category mb-4">
            <h3 className="font-semibold">Du lịch văn hóa</h3>
            <ul>
              <li>Khám phá di sản văn hóa</li>
              <li>Du lịch lễ hội</li>
              <li>Du lịch ẩm thực</li>
            </ul>
          </div>
          <div className="category mb-4">
            <h3 className="font-semibold">Du lịch sinh thái</h3>
            <ul>
              <li>Khám phá thiên nhiên</li>
              <li>Trại bảo tồn động vật hoang dã</li>
              <li>Du lịch cộng đồng</li>
            </ul>
          </div>
        </Card>
        </div>
       
      </div>
    </div>
  );
}

export default Tourism;
