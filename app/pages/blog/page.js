"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../../libs/firebase'; // Import Firestore
import { List, Card, Spin, message } from 'antd'; // Ant Design components for displaying data
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore query methods

function LawPage() {
  const [posts, setPosts] = useState([]); // State to hold the fetched posts
  const [loading, setLoading] = useState(true); // State to manage loading state

  // Fetch "Pháp luật" category posts from Firestore
  const fetchLawPosts = async () => {
    setLoading(true);

    try {
      // Query Firestore for posts where category is 'law'
      const q = query(collection(db, "blog"));
      const querySnapshot = await getDocs(q);

      const lawPosts = [];
      querySnapshot.forEach((doc) => {
        lawPosts.push({ id: doc.id, ...doc.data() });
      });

      setPosts(lawPosts); // Set posts data
      setLoading(false); // Stop loading
    } catch (error) {
      console.error("Error fetching law posts:", error);
      message.error("Error fetching law posts");
      setLoading(false); // Stop loading on error
    }
  };

  // Use effect to fetch posts when the component mounts
  useEffect(() => {
    fetchLawPosts(); // Fetch posts when the page loads
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
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Pháp luật - Posts</h2>

      {/* Display posts in a list */}
      {posts.length > 0 ? (
        <List
          grid={{ gutter: 16, column: 3 }} // Display posts in 3 columns
          dataSource={posts}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title}>
                <p>{item.description}</p>
                <p>Category: {item.category}</p>
                <p>{new Date(item.createdAt.seconds * 1000).toLocaleDateString()}</p>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <p>No posts available in the Pháp luật category.</p>
      )}
    </div>
  );
}

export default LawPage;
