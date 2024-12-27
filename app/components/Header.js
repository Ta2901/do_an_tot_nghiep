/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase auth
import { auth } from '../libs/firebase';
import { Button, Dropdown, Menu, Avatar } from 'antd'; // Import Ant Design components
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'; // Import Ant Design icons
import Link from 'next/link'; // Import Link from Next.js

export default function Header() {
  const [user, setUser] = useState(null); // Store user data
  const router = useRouter();

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set user state
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // Handle logout
  const handleLogout = () => {
    signOut(auth).then(() => {
      router.push('/auth/login'); // Redirect to login page after logout
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  // Menu for the dropdown
  const menu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />} onClick={() => router.push('/pages/manage')}>
        Manage
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined className="text-red-500" />} onClick={handleLogout}>
        <span className="text-red-500">Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="bg-[#95938A]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="http://localhost:3000/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.PNG" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
        </a>

        {/* Hamburger Menu Button for Mobile */}
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        {/* Navbar Menu */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex space-x-3">
            <li className="hover:bg-[#DFDED7] text-black px-4 hover:h-full rounded-md">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:bg-[#DFDED7] text-black px-4 rounded-md">
              <Link href="/pages/news">Tin tức</Link>
            </li>
            <li className="hover:bg-[#DFDED7] text-black px-4 rounded-md">
              <Link href="/pages/law">Pháp luật</Link>
            </li>
            <li className="hover:bg-[#DFDED7] text-black px-4 rounded-md">
              <Link href="/pages/tourism">Du lịch</Link>
            </li>
        
            <li className="hover:bg-[#DFDED7] text-black px-4 rounded-md">
              <Link href="/pages/blog">Blog</Link>
            </li>
            <li className="hover:bg-[#DFDED7] text-black px-4 rounded-md">
              <Link href="/pages/more">More</Link>
            </li>

            {/* Conditional Rendering for User Avatar or Login Button */}
            <li>
              {user ? (
                <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                  <a className="flex items-center space-x-2 cursor-pointer">
                    <Avatar src={user.photoURL || "/default-avatar.png"} size={32} />
                    <span className="text-sm">{user.displayName || "User"}</span>
                  </a>
                </Dropdown>
              ) : (
                <button className="bg-gray-400 px-2 rounded-xl">
                  <Link href="/pages/auth/login">Đăng nhập</Link>
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
