"use client";
import React from 'react';
import { Button, Spin} from 'antd';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'; // Firebase hooks
import { auth } from '../../../libs/firebase';
import { useRouter } from 'next/navigation'; // For Next.js routing
import { GoogleOutlined } from '@ant-design/icons'; // Import Google icon from Ant Design

const Login = () => {
  // Firebase hooks for authentication
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

  // Next.js router to navigate
  const router = useRouter();

  // Handle Google login
  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  // If logged in, navigate to the home/dashboard page
  if (googleUser) {
    router.push('/pages/manage'); // Redirect to the dashboard or home page
    return null;
  }

  // Loading spinner while the user is logging in
  if (googleLoading) {
    return <Spin size="large" className="flex justify-center items-center h-screen" />; // Show loading spinner while logging in
  }

  // Handle navigation to registration page
  const handleNavigateToRegister = () => {
    router.push('/auth/Register'); // Redirect to registration page
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-80 p-8 rounded-lg shadow-lg border border-gray-200">
        {/* Google Login Button */}
        <div className="mt-4">
          <Button
            type="default"
            onClick={handleGoogleLogin}
            block
            icon={<GoogleOutlined />}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#4285F4',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '8px',
              border: 'none',
              padding: '12px 16px',
              fontSize: '16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            Login with Google
          </Button>
        </div>

        {/* Register Navigation */}
        <div className="mt-4 text-center">
          <span className='text-gray-500'>Dont have an account? </span>
          <Button
            type="link"
            onClick={handleNavigateToRegister}
            style={{
              padding: 0,
              fontWeight: 'bold',
              color: '#4285F4',
            }}
          >
            Register here
          </Button>
        </div>

        {/* Show Firebase error message */}
        {googleError && (
          <div className="mt-4 text-center text-red-500">
            <p>{googleError.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;