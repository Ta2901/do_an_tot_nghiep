'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import "./more.css"
import { BriefcaseIcon, HomeIcon, HeartIcon, UsersIcon, HandIcon, ShoppingCartIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const items = [
    { href: "/app/pages/job_search", icon: <BriefcaseIcon className="text-blue-500" />, label: "Tìm kiếm việc làm" },
    { href: "/app/pages/housing", icon: <HomeIcon className="text-green-500" />, label: "Nhà ở" },
    { href: "/app/pages/health", icon: <HeartIcon className="text-red-500" />, label: "Sức khỏe" },
    { href: "/app/pages/bai_viet", icon: <UsersIcon className="text-yellow-500" />, label: "Câu lạc bộ" },
    { href: "/app/pages/volunteer", icon: <HandIcon className="text-indigo-500" />, label: "Hoạt động tình nguyện" },
    { href: "/app/pages/vietnamese_market", icon: <ShoppingCartIcon className="text-purple-500" />, label: "Chợ Việt" },
];

export default function More() { // Đổi tên component thành More
    return (
        <div className={styles.morePage}>
            <Header className="bg-[#DFDED7] w-full z-10" />

            <div className={styles.gridContainer}>
                <div className={styles.grid}>
                    {items.map((item, index) => (
                        <div key={index} className={styles.gridItem}>
                            <Link href={item.href} className="flex flex-col items-center">
                                {item.icon}
                                <p className="mt-2">{item.label}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}