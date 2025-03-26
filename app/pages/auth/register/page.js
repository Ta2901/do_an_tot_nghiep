"use client";
import React, { useState } from 'react';
import { Input, Checkbox, Button, Spin, Alert } from 'antd';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../../libs/firebase';
import { useRouter } from 'next/navigation';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'; // Import icons
import "./register.css";

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const router = useRouter();

    const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        message.error("Passwords do not match");
        return;
    }
    try {
        console.log("Attempting to create user with email:", email); // Thêm dòng này
        const result = await createUserWithEmailAndPassword(email, password);
        console.log("User creation result:", result); // Thêm dòng này
        if (result && result.user) {
            await updateProfile({ displayName: name });
            message.success("Registration successful!");
            router.push('/pages/manage');
        }
    } catch (err) {
        console.error("Error during registration:", err); // Thêm dòng này
        message.error(err.message);
    }
};
    if (user) {
        router.push('/pages/manage');
        return null;
    }

    if (loading) {
        return <Spin size="large" className="flex justify-center items-center h-screen" />;
    }

    const handleLoginLinkClick = () => {
        router.push('/pages/login'); // Điều hướng đến trang đăng nhập
    };

    return (
        <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
            <div className="flex shadow-md">
                <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white" style={{ width: '24rem', height: '36rem' }}>
                    <div className="w-72">
                        <h1 className="text-xl font-semibold">Create your account</h1>
                        <small className="text-gray-400 font-semibold ">Join the VCI family!</small>

                        <form className="mt-4" onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label className="mb-2 block text-xs font-semibold">User Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="mb-2 block text-xs font-semibold">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                                <label className="mb-2 block text-xs font-semibold">Password</label>
                                                <Input.Password
                                                        placeholder="*****"
                                                        className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                                />
                                        </div>

                                        <div className="mb-3">
                                                <label className="mb-2 block text-xs font-semibold">Confirm Password</label>
                                                <Input.Password
                                                        placeholder="*****"
                                                        className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                                />
                                        </div>

                            <div className="mb-3">
                                <button type="submit" className="block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">Register</button>
                            </div>
                        </form>

                        <div className="text-center">
                            <span className="text-xs text-gray-400 font-semibold">Already have an account?</span>
                            <a
                                href="#"
                                className="text-xs font-semibold text-purple-700"
                                onClick={handleLoginLinkClick}
                            >
                                Login
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap content-center justify-center rounded-r-md" style={{ width: '24rem', height: '36rem' }}>
                    <img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md" src="https://i.pinimg.com/736x/66/32/3a/66323ae057dc2577521179970e9e90ff.jpg" alt="Register Banner" />
                </div>
            </div>
            {error && <Alert message={`Error: ${error.message}`} type="error" />}
            <div className="mt-3 w-full">
                <p className="text-center">Made by VCI's ADMIN Team </p>
            </div>
        </div>
    );
};

export default RegisterForm;