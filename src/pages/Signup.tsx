
import React from 'react';
import { SignupForm } from '@/components/auth/SignupForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Signup = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-social-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <h1 className="text-center text-4xl font-bold text-social-primary">ChatterVerse</h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join our community today!
        </p>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
