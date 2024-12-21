import Header from "./components/Header";
import Footer from "./components/Footer";


export default function Page() {
  return (
    <div>
      <Header />
      
      {/* Main image */}
      <img src="/home.png" alt="Homepage banner" className="w-full h-auto" /> {/* Added alt and class for responsiveness */}
      
      {/* Container with background image */}
      <div className="grid grid-rows-auto gap-4 mx-24 mt-8 max-w-7xl text-xl text-black" style={{
        backgroundImage: "url('/logo.PNG')",  // Path to your image
        backgroundSize: 'cover',  // Ensures the background image covers the entire div
        backgroundPosition: 'center',  // Centers the image within the div
        backgroundRepeat: 'no-repeat',  // Prevents repeating the image
        width: '80%',  // The width will be responsive to the parent container
      }}>
        {/* Tin tức Section */}
        <div className="col-span-1 row-span-1 flex items-center justify-center relative" style={{ backgroundColor: 'rgba(217, 217, 217, 0.6)', height: '100px' }}>
          <img src="icon_news.png" alt="Tin tức" className="w-16 h-16 object-cover mb-2" />
          <p className="m-[10px] text-lg">Tin tức</p>
          <a href="/pages/news" className="absolute bottom-2 right-2">
            <img src="icon_next.png" alt="Next" className="w-6 h-6" />
          </a>
        </div>

        {/* Pháp luật Section */}
        <div className="flex items-center justify-center relative" style={{ backgroundColor: 'rgba(217, 217, 217, 0.6)', height: '100px' }}>
          <img src="icon_law.png" alt="Pháp luật" className="w-[100px] h-full object-contain m-2 scale-70" />
          <p className="m-[5px] text-lg">Pháp luật</p>
          <a href="/pages/law" className="absolute bottom-2 right-2">
            <img src="icon_next.png" alt="Next" className="w-6 h-6" />
          </a>
        </div>

        {/* Du lịch Section */}
        <div className="flex items-center justify-center relative" style={{ backgroundColor: 'rgba(217, 217, 217, 0.6)', height: '100px' }}>
          <img src="icon_tourism.png" alt="Du lịch" className="w-16 h-16 object-cover mb-2 rounded-full" />
          <p className="m-[10px] text-lg">Du lịch</p>
          <a href="/pages/tourism" className="absolute bottom-2 right-2">
            <img src="icon_next.png" alt="Next" className="w-6 h-6" />
          </a>
        </div>

        {/* Khác Section */}
        <div className="row-start-2 flex items-center justify-center relative" style={{ backgroundColor: 'rgba(217, 217, 217, 0.6)', height: '100px' }}>
          <img src="icon_more.png" alt="Khác" className="w-16 h-16 object-cover mb-2" />
          <p className="m-[10px] text-lg">Khác</p>
          <a href="/pages/more" className="absolute bottom-2 right-2">
            <img src="icon_next.png" alt="Next" className="w-6 h-6" />
          </a>
        </div>

        {/* Blog Section */}
        <div className="col-span-2 row-start-2 flex items-center justify-center relative" style={{ backgroundColor: 'rgba(217, 217, 217, 0.6)', height: '100px' }}>
          <img src="icon_blog.png" alt="Blog" className="w-16 h-16 object-cover mb-2" />
          <p className="m-[10px] text-lg">Blog</p>
          <a href="/pages/blog" className="absolute bottom-2 right-2">
            <img src="icon_next.png" alt="Next" className="w-6 h-6" />
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}

