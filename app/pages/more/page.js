//law page

'use client';

import React from 'react';
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

export default function Page() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#DFDED7' }}>
            <Header style={{ backgroundColor: '#DFDED7', width: '100%', zIndex: 10 }} />

            {/* Centered and resized grid */}
<div
    style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }}
>
    <div
        className="grid grid-cols-3 grid-rows-2 gap-4"
        style={{
            width: '50%',
            textAlign: 'center',
            backgroundColor: 'transparent',
            padding: '20px',
        }}
    >
        <div
            style={{
                padding: '10px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <img src="/icon_job.PNG" alt="Image 1" style={{ width: '100%', borderRadius: '5px' }} />
            <p style={{ color: '#000' }}>Tìm kiếm việc làm</p>
        </div>
        <div
            style={{
                padding: '10px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <img src="/icon_home.png" alt="Image 2" style={{ width: '100%', borderRadius: '5px' }} />
            <p style={{ color: '#000' }}>Nhà ở</p>
        </div>
        <div
            style={{
                padding: '10px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <img src="/health.png" alt="Image 3" style={{ width: '100%', borderRadius: '5px' }} />
            <p style={{ color: '#000' }}>Sức khỏe</p>
        </div>
        <div
            style={{
                padding: '10px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <img src="/clb.png" alt="Image 4" style={{ width: '100%', borderRadius: '5px' }} />
            <p style={{ color: '#000' }}>Câu lạc bộ</p>
        </div>
        <div
            style={{
                padding: '10px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <img src="/volunteer.png" alt="Image 5" style={{ width: '100%', borderRadius: '5px' }} />
            <p style={{ color: '#000' }}>Hoạt động tình nguyện</p>
        </div>
        <div
            style={{
                padding: '10px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <img src="/shopping.png" alt="Image 6" style={{ width: '100%', borderRadius: '5px' }} />
            <p style={{ color: '#000' }}>Chợ Việt</p>
        </div>
    </div>
</div>

            {/* Footer luôn ở đáy trang */}
            <Footer />
        </div>
    );
}
