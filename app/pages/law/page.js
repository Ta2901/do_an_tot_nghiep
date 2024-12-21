//law page

'use client';

import React, { useState } from 'react';
import { Carousel } from 'antd';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Define the contentStyle outside of Page component
const contentStyle = {
    paddingTop: '25px',
    height: '260px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

// Define the App component outside of Page component
const App = () => (
    <Carousel autoplay>
        <div>
            <h3 style={contentStyle}>1</h3>
        </div>
        <div>
            <h3 style={contentStyle}>2</h3>
        </div>
        <div>
            <h3 style={contentStyle}>3</h3>
        </div>
        <div>
            <h3 style={contentStyle}>4</h3>
        </div>
    </Carousel>
);

export default function Page() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#DFDED7' }}>
            <Header style={{ backgroundColor: '#DFDED7', width: '100%', zIndex: 10 }} /> {/* Đảm bảo header không bị đè */}
            
            <div style={{ paddingLeft: '50px', paddingRight: '50px', flex: 1 }}> {/* Padding cho phần sider */}
                {/* Thêm margin-top để tạo khoảng cách 20px */}
                <div style={{ marginTop: '20px' }}>
                    <App />
                </div>

                {/* Search Section with Horizontal Lines */}
                <div className="relative w-full my-4">
                    {/* Horizontal Line Above */}
                    <div className="w-full h-px bg-black mb-4"></div> {/* Đổi màu thành đen */}
                    {/* Dropdown Form */}
                    <form className="max-w-lg mx-auto">
                        <div className="relative flex"> {/* Set relative for parent container */}
                        <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"></label>
                        <button
                            id="dropdown-button"
                            onClick={toggleDropdown}
                            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                            type="button"
                        >
                            Phân loại
                            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute left-0 top-full mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 z-20">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                <li><button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Luật dân sự</button></li>
                                <li><button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Luật hình sự</button></li>
                                <li><button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Luật lao động</button></li>
                                <li><button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Luật kinh tế</button></li>
                                <li><button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Luật giáo dục</button></li>
                                <li><button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Luật gia đình</button></li>
                                <li><button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Luật hành chính</button></li>
                                <li><button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Luật môi trường</button></li>
                            </ul>
                            </div>
                        )}

                        {/* Search Input */}
                        <div className="relative w-full">
                            <input
                            type="search"
                            id="search-dropdown"
                            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                            placeholder="Tìm kiếm thông tin pháp luật..."
                            required
                            />
                            <button
                            type="submit"
                            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span className="sr-only">Search</span>
                            </button>
                        </div>
                        </div>
                    </form>   
                    

                    {/* Horizontal Line Below */}
                    <div className="w-full h-px bg-black mt-4"></div> {/* Đổi màu thành đen */}
                </div>


                </div>
                <div class="flex justify-center ">
                    <div class="text-center">
                        <h1 class="text-xl font-bold text-black">Thông tin pháp luật</h1>
                    </div>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[5px] px-8 py-7 text-black">
                    <div class="h-24 bg-gray-300 flex justify-center items-center">Luật dân sự</div>
                    <div class="h-24 bg-gray-300 flex justify-center items-center">Luật hình sự</div>
                    <div class="h-24 bg-gray-300 flex justify-center items-center">Luật lao động</div>
                    <div class="h-24 bg-gray-300 flex justify-center items-center">Luật kinh tế</div>
                    <div class="h-24 bg-gray-300 flex justify-center items-center">Luật giáo dục</div>
                    <div class="h-24 bg-gray-300 flex justify-center items-center">Luật hành chính</div>
                    <div class="h-24 bg-gray-300 flex justify-center items-center">Luật gia đình</div>
                    <div class="h-24 bg-gray-300 flex justify-center items-center">Luật môi trường</div>
                </div>
                


                



            {/* Footer luôn ở đáy trang */}
            <Footer />
        </div>
    );
}
