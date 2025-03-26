/* eslint-disable @next/next/no-img-element */
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css"

export default function Page() {
  return (
    <div>
      <Header />
    


      {/* Main image */}
      <div className="relative"> {/* Thêm relative để định vị tuyệt đối */}
        <img src="/home.png" alt="Homepage banner" className="w-full h-auto" />

       {/* Thêm phần tử div mới với dòng chữ */}
       <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black">
          <h1 className="text-xl font-bold">
            <span className="hover-zoom">VCI - VietNam Comprehensive Information</span> 
            
          </h1>
          <p className="text-lg mt-2">
            - 
            <span className="hover-zoom">Cẩm nang thông tin Hàn Quốc</span> 
            
            -
          </p>
        </div>
      </div>
      {/* Container with background image */}
      <div
        className="grid-container"
        style={{
          backgroundImage: "url('/logo.PNG')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        {/* Hàng 1: 3 mục */}
        <div className="section">
          <img src="icon_news.png" alt="Tin tức" className="icon" />
          <p className="title">Tin tức</p>
          <a href="/pages/news" className="next-icon">
            <img src="icon_next.png" alt="Next" className="w-6 h-6" />
          </a>
        </div>

        <div className="section">
          <img src="icon_law.png" alt="Pháp luật" className="icon" />
          <p className="title">Pháp luật</p>
          <a href="/pages/law" className="next-icon">
            <img src="icon_next.png" alt="Next" className="w-6 h-6" />
          </a>
        </div>

        <div className="section">
          <img src="icon_tourism.png" alt="Du lịch" className="icon rounded-full" />
          <p className="title">Du lịch</p>
          <a href="/pages/tourism" className="next-icon">
            <img src="icon_next.png" alt="Next" className="w-6 h-6" />
          </a>
        </div>

        {/* Hàng 2: 2 mục trải ngang */}
        <div className="section wide-section">
          <img src="icon_more.png" alt="Khác" className="icon" />
          <p className="title">Khác</p>
          <a href="/pages/more" className="next-icon">
            <img src="icon_next.png" alt="Next" className="w-6 h-6" />
          </a>
        </div>

        <div className="section wide-section">
          <img src="icon_blog.png" alt="Blog" className="icon" />
          <p className="title">Blog</p>
          <a href="/pages/blog" className="next-icon">
            <img src="icon_next.png" alt="Next" className="w-6 h-6" />
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
