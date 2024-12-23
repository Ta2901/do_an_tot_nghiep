"use client";
import Header from "../../components/Header";
import ExchangeRate from "../../components/ExchangeRate";
import Weather from "../../components/Weather"; // Import Weather
import "./news.css";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/app/libs/firebase";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
export default function New() {
  const [data, setData] = useState();
  const newsList = [
    "Viện Kiểm sát Hàn Quốc điều tra cựu nghị sĩ đang cầm quyền về nghi ngờ can thiệp trong quá trình tiến cử",
    "Một người Hàn Quốc nằm trong danh sách dự lễ trao giải Nobel Hòa bình 2024",
    "Đảng cầm quyền Hàn Quốc có khả năng khởi động các cuộc thảo luận riêng với Chính phủ và giới y tế",
    "Phó Tổng thống Mỹ chỉ trích cựu Tổng thống Donald Trump vì coi nhẹ đồng minh Hàn-Mỹ",
    "Bắc Triều Tiên thành lập cơ quan mới đối phó với Hàn Quốc",
  ];

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "news"));
      const fetchedData = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ ...doc.data(), id: doc.id });
      });
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data: ", error);
      message.error("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  return (
    <div>
      <Header />
      {/*hàng 1  */}
      <div className="flex justify-between mx-auto max-w-7xl container">
        {/* Ô1  */}
        <div className="div1">
          <h1> Thiết quân lệnh được ban hành hại Hàn Quốc </h1>
        </div>
        {/* Ô 2 */}
        <div className="div2">
          <h2 className="news-title">Tin Nóng</h2>
          <ul className="news-list space-y-4">
            {data?.map((item, index) => (
              <li
                key={index}
                className="flex items-center space-x-4 p-4 border-b border-gray-300"
              >
               <Link href={`/pages/news/${item.id}`} className="flex space-x-2">
               
               
                <Image
                  src={item.imageUrl[0] || "/placeholder.jpg"}
                  alt={item.title || "News Image"}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-sm cursor-pointer font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  {/* <p className="text-sm text-gray-500">{item.description}</p> */}
                  <span className="text-xs text-gray-400">
                    {new Date(
                      item.createdAt.seconds * 1000
                    ).toLocaleDateString()}
                  </span>
                </div>
               </Link>

              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* hàng 2 */}
      <div className="flex justify-between mx-auto max-w-7xl container">
        {/* Ô 3 */}
        <div className="div3">
          <Weather />
        </div>

        {/* Ô 4 */}
        <div className="div4">
          <ExchangeRate />
        </div>
      </div>
      {/* hàng 3 */}
      <div className="flex justify-between mx-auto max-w-7xl container">
        {/* Ô 5 */}
        <div className="div5"> 3</div>
        {/* Ô 6 */}
        <div className="div6">4</div>
      </div>
    </div>
  );
}
