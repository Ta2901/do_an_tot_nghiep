/* eslint-disable @next/next/no-img-element */
import Header from "./components/Header";

export default function Page  () {
  return (
    <div >
   <Header />
      <img src="/home.png " alt="home"/>

      <div className="grid  grid-rows-5 gap-4 h-screen mx-24  mt-8 max-w-7xl text-xl text-black">
  <div className="bg-[#D9D9D9] col-span-1 row-span-1 flex items-center justify-center">
    <a href="/pages/news">
    Tin tức
      </a>
    </div>
  <div className="bg-[#D9D9D9] flex items-center justify-center">Pháp luật ,mfngfdg</div>
  <div className="bg-[#D9D9D9] flex items-center justify-center">Du lịch</div>
  <div className="bg-[#D9D9D9] row-start-2 flex items-center justify-center">Khác</div>
  <div className="bg-[#D9D9D9] col-span-2 row-start-2 flex items-center justify-center">Blog</div>
</div>

  </div>
  );
}
