import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Redirect to dashboard if already logged in
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex justify-center items-center py-12 px-4 bg-gray-50">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;
