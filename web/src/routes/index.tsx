import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import RedirectPage from '../pages/RedirectPage';
import NotFoundPage from '../pages/NotFoundPage';

// Get API URL from environment or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/analytics/:id" element={<AnalyticsPage />} />
      {/* Redirect to backend API for short URLs */}
      <Route path="/s/:shortUrl" element={<RedirectPage />} />
      {/* Alternatively, you can use a direct redirect component here:
      <Route 
        path="/s/:shortUrl" 
        element={<Navigate to={(location) => `${API_URL}/url-shortner/${location.pathname.split('/').pop()}`} replace={true} />} 
      /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
