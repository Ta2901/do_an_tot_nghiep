"use client";
import React from 'react';
import { Button, Form, Input, Spin, message } from 'antd';
import { useForm, Controller } from 'react-hook-form'; // Use Controller for AntD integration
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'; // Firebase hooks
import { auth } from '../../../libs/firebase';
import { useRouter } from 'next/navigation'; // For Next.js routing (if using Next.js)

const Register = () => {
  // React Hook Form setup
  const { control, handleSubmit, formState: { errors } } = useForm();

  // Firebase hook for creating a new user
  const [createUserWithEmailAndPassword, userCredential, loading, error] = useCreateUserWithEmailAndPassword(auth);

  // Next.js Router
  const router = useRouter();

  // Handle form submission
  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
  };

  // If registration is successful, redirect to login page
  if (userCredential) {
    router.push('/pages/manage'); // Redirect to login page after successful registration
  }

  if (loading) {
    return <Spin size="large" />; // Show loading spinner
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-80 p-8 rounded-lg shadow-md">
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
          <Form.Item
            label="Email"
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email ? errors.email.message : null}
          >
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => <Input {...field} type="email" placeholder="Email" />}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password ? errors.password.message : null}
          >
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => <Input.Password {...field} placeholder="Password" />}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <Button type="link" onClick={() => router.push('/auth/login')} style={{ padding: 0 }}>
            Login here
          </Button>
        </div>

        {/* Show Firebase error message */}
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
      </div>
    </div>
  );
};

export default Register;
