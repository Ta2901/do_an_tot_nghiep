"use client";
import Header from "../../components/Header";
import ExchangeRate from "../../components/ExchangeRate";
import Weather from "../../components/Weather";
import "./news.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/app/libs/firebase";
import { getDocs, collection } from "firebase/firestore";
import Footer from '../../components/Footer';

export default function New() {
  const [data, setData] = useState([]);

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
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      {/* Hàng 1 */}
      <div className="flex flex-wrap justify-between mx-auto max-w-7xl container">
        {/* Ô 1 */}
        <div className="div1 w-full md:w-[68%]">
          <h1>
            Tổng thống Yoon bị triệu tập vào Giáng sinh
            <img
              src="https://vcdn1-vnexpress.vnecdn.net/2024/12/20/tong-thong-han-quoc-1734667836-5082-1734668096.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=qCGCzFx4-mfeO0TSN1LGfg"
              alt="Homepage banner"
              className="w-full h-auto"
            />
          </h1>
        </div>
        {/* Ô 2 */}
        <div className="div2 w-full md:w-[30%]">
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
                    <span className="text-xs text-gray-400">
                      {new Date(item.createdAt.seconds * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Hàng 2 */}
      <div className="flex flex-wrap justify-between mx-auto max-w-7xl container">
        {/* Ô 3 */}
        <div className="div3 w-full md:w-[39%]">
          <Weather />
        </div>
        {/* Ô 4 */}
        <div className="div4 w-full md:w-[59%]">
          <ExchangeRate />
        </div>
      </div>
      {/* Hàng 3 */}
      <div className="flex flex-wrap justify-between mx-auto max-w-7xl container">
        {/* Ô 5 */}
        <div className="div5 w-full md:w-[39%]">3</div>
        {/* Ô 6 */}
        <div className="div6 w-full md:w-[59%]">4</div>
      </div>
      {/* Thêm Footer ở cuối */}
      <Footer />
    </div>
    
  );
}