"use client";
import Header from "@/app/components/Header";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/app/libs/firebase"; // Đảm bảo bạn đã import db
import { Card, Carousel } from "antd";

const contentStyle = {
  margin: 0,
  height: "140px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export default function Page() {
  const params = useParams();
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const docRef = doc(db, "news", params.id); // Sử dụng doc thay vì collection
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        setData(docSnapshot.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id]); // Chạy lại nếu params.id thay đổi

  return (
    <div>
      <Header />
      <div className="flex justify-between mx-auto max-w-7xl container p-8">
        {data ? (
          <Card>
            <h1 className="text-2xl font-bold">{data.title}</h1>
            <Carousel>
              {data.imageUrl && data.imageUrl.map((imageUrl, index) => (
                <div key={index}>
                  <img
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              ))}
            </Carousel>
            <p>{data.description}</p>
            {/* Hiển thị các thông tin khác từ dữ liệu */}
          </Card>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
