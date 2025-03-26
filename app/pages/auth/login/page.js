"use client";
import React, { useState } from 'react';
import { Input, Checkbox, Button, Spin, Alert } from 'antd';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../../libs/firebase';
import { useRouter } from 'next/navigation';
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(email, password);
    };

    if (user) {
        router.push('/pages/manage');
        return null;
    }

    if (loading) {
        return <Spin size="large" className="flex justify-center items-center h-screen" />;
    }

    const handleRegisterLinkClick = () => {
        router.push('/pages/register'); // Điều hướng đến trang đăng ký
    };

    return (
        <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
            <div className="flex shadow-md">
                <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white" style={{ width: '24rem', height: '32rem' }}>
                    <div className="w-72">
                        <h1 className="text-xl font-semibold">Welcome back</h1>
                        <small className="text-gray-400 font-semibold ">We are VCI family!</small>

                        <form className="mt-4" onSubmit={handleLogin}>
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
                                <input
                                    type="password"
                                    placeholder="*****"
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="mb-3 flex flex-wrap content-center">
                                <input id="remember" type="checkbox" className="mr-1 checked:bg-purple-700" />
                                <label htmlFor="remember" className="mr-auto text-xs font-semibold">Remember for 30 days</label>
                                <a href="#" className="text-xs font-semibold text-purple-700">Forgot password?</a>
                            </div>

                            <div className="mb-3">
                                <button type="submit" className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">Sign in</button>
                                <button className="flex flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md">
                                    <img className="w-5 mr-2" src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" />
                                    Sign in with Google
                                </button>
                            </div>
                        </form>

                        <div className="text-center">
                            <span className="text-xs text-gray-400 font-semibold">Don't have account?</span>
                            <a
                                href="#"
                                className="text-xs font-semibold text-purple-700"
                                onClick={handleRegisterLinkClick}
                            >
                                Sign up
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap content-center justify-center rounded-r-md" style={{ width: '24rem', height: '32rem' }}>
                    <img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md" src="https://i.pinimg.com/736x/66/32/3a/66323ae057dc2577521179970e9e90ff.jpg" alt="Login Banner" />
                </div>
            </div>
            {error && <Alert message={`Error: ${error.message}`} type="error" />}
            <div className="mt-3 w-full">
                <p className="text-center">Made by VCI's ADMIN Team </p>
            </div>
        </div>
    );
};

export default Login;