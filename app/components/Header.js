"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../libs/firebase';
import { Dropdown, Menu, Avatar } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function Header() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // Thêm state showDropdown
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      router.push('/auth/login');
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`bg-[#95938A] ${isMenuOpen ? 'menu-open' : ''} fixed-header`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="http://localhost:3000/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.PNG" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
        </a>

        {/* Hamburger Button (hiển thị trên màn hình nhỏ) */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

         {/* Menu ẩn trên màn hình di động */}
<div className={`${isMenuOpen ? 'fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 md:hidden overlay' : 'hidden'}`}>
  <div className="menu-container w-64 bg-white shadow-lg rounded-lg p-4">
    <div className="menu-header flex items-center justify-between mb-4">
      <button className="close-button text-gray-600 hover:text-gray-800" onClick={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      {user && ( // Hiển thị thông tin người dùng chỉ khi đã đăng nhập
      <div className="relative"> {/* Thêm relative để định vị menu con */}
        <div className="user-info flex items-center cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}> {/* Thêm cursor-pointer và onClick */}
          <Avatar src={user.photoURL || "/default-avatar.png"} size={40} className="rounded-full mr-2" />
          <div className="user-details text-sm">
            <div className="user-name font-semibold">{user.displayName || "User"}</div>
            <div className="user-email text-gray-600">{user.email || "Email"}</div>
          </div>
        </div>
        {showDropdown && ( // Hiển thị dropdown khi showDropdown là true
          <div className="absolute top-full left-0 bg-white rounded-md shadow-lg p-2 mt-1 w-48"> {/* Thêm dropdown menu */}
            <button className="block w-full text-left p-2 hover:bg-gray-100" onClick={() => { router.push('/pages/settings'); setShowDropdown(false); toggleMenu(); }}>
              Cài đặt
            </button>
            <button className="block w-full text-left p-2 hover:bg-gray-100" onClick={() => { handleLogout(); setShowDropdown(false); toggleMenu(); }}>
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    )}
    </div>
    <ul className="menu-list space-y-2">
      <li className="menu-item flex items-center text-gray-700 hover:text-gray-900" onClick={() => { router.push('/'); toggleMenu(); }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
        <span className="ml-2">Home</span>
      </li>
      <li className="menu-item flex items-center text-gray-700 hover:text-gray-900" onClick={() => { router.push('/pages/news'); toggleMenu(); }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
        <span className="ml-2">Tin tức</span>
      </li>
      {/* Thêm các mục menu khác tương tự */}
      <li className="menu-item flex items-center text-gray-700 hover:text-gray-900" onClick={() => { router.push('/pages/law'); toggleMenu(); }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
        <span className="ml-2">Pháp luật</span>
      </li>
      <li className="menu-item flex items-center text-gray-700 hover:text-gray-900" onClick={() => { router.push('/pages/tourism'); toggleMenu(); }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
        <span className="ml-2">Du lịch</span>
      </li>
      <li className="menu-item flex items-center text-gray-700 hover:text-gray-900" onClick={() => { router.push('/pages/blog'); toggleMenu(); }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
        <span className="ml-2">Blog</span>
      </li>
      <li className="menu-item flex items-center text-gray-700 hover:text-gray-900" onClick={() => { router.push('/pages/more'); toggleMenu(); }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
        <span className="ml-2">More</span>
      </li>
    </ul>
    {!user && ( // Hiển thị nút đăng nhập nếu chưa đăng nhập
      <div className="menu-footer flex items-center text-gray-700 hover:text-gray-900 mt-4" onClick={() => { router.push('/pages/auth/login'); toggleMenu(); }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><log-in /></svg>
        <span className="ml-2">Đăng nhập</span>
      </div>
    )}
  </div>
</div>

        {/* Menu trên màn hình desktop (hiển thị trên màn hình lớn) */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex space-x-3">
            <li className="hover:bg-[#DFDED7] text-black px-4 rounded-md">
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