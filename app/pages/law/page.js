// Law Page
'use client';

import React, { useState } from 'react';
import { Carousel } from 'antd';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const contentStyle = {
    paddingTop: '25px',
    height: '260px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const AppCarousel = () => (
    <Carousel autoplay>
        {[1, 2, 3, 4].map((item) => (
            <div key={item}>
                <h3 style={contentStyle}>{item}</h3>
            </div>
        ))}
    </Carousel>
);

const Dropdown = ({ isOpen, toggleDropdown }) => (
    <>
        <button
            id="dropdown-button"
            onClick={toggleDropdown}
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
            type="button"
        >
            Phân loại
            <svg
                className="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l4 4 4-4"
                />
            </svg>
        </button>
        {isOpen && (
            <div className="absolute left-0 top-full mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 z-20">
                <ul className="py-2 text-sm text-gray-700">
                    {['Luật dân sự', 'Luật hình sự', 'Luật lao động', 'Luật kinh tế', 'Luật giáo dục', 'Luật gia đình', 'Luật hành chính', 'Luật môi trường'].map((item) => (
                        <li key={item}>
                            <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </>
);

const SearchSection = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="relative w-full my-4">
            <div className="w-full h-px bg-black mb-4" />
            <form className="max-w-lg mx-auto">
                <div className="relative flex">
                    <Dropdown isOpen={isDropdownOpen} toggleDropdown={toggleDropdown} />
                    <div className="relative w-full">
                        <input
                            type="search"
                            id="search-dropdown"
                            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Tìm kiếm thông tin pháp luật..."
                            required
                        />
                        <button
                            type="submit"
                            className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg hover:bg-blue-800"
                        >
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 19l-4-4m0-7a7 7 0 1 1 1-14 7 7 0 0 1-1 14z"
                                />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form>
            <div className="w-full h-px bg-black mt-4" />
        </div>
    );
};

const CategoriesGrid = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 px-8 py-7 text-black">
        {['Luật dân sự', 'Luật hình sự', 'Luật lao động', 'Luật kinh tế', 'Luật giáo dục', 'Luật hành chính', 'Luật gia đình', 'Luật môi trường'].map((category) => (
            <div key={category} className="h-24 bg-gray-300 flex justify-center items-center">
                {category}
            </div>
        ))}
    </div>
);

export default function Page() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#DFDED7' }}>
            <Header style={{ backgroundColor: '#DFDED7', width: '100%', zIndex: 10 }} />
            <div style={{ paddingLeft: '50px', paddingRight: '50px', flex: 1 }}>
                <div style={{ marginTop: '20px' }}>
                    <AppCarousel />
                </div>
                <SearchSection />
                <div className="flex justify-center ">
                    <div className="text-center">
                        <h1 className="text-xl font-bold text-black">Thông tin pháp luật</h1>
                    </div>
                </div>
                <CategoriesGrid />
            </div>
            <Footer />
        </div>
    );
}
