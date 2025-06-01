import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CreateUrlForm from '../components/url/CreateUrlForm';
import UrlList from '../components/url/UrlList';
import { useAuth } from '../contexts/AuthContext';
import { urlShortenerAPI } from '../services/api';
import { UrlShortner } from '../types';

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [urls, setUrls] = useState<UrlShortner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  const fetchUrls = async () => {
    setLoading(true);
    setError(null);
    try {
      const userUrls = await urlShortenerAPI.getAllByUser(currentUser._id);
      setUrls(userUrls);
    } catch (err: any) {
      console.error('Error fetching URLs:', err);
      setError(err.response?.data?.message || 'Failed to fetch your URLs');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUrls();
  }, [currentUser._id]);
  
  const handleUrlCreated = (newUrl: UrlShortner) => {
    setUrls((prevUrls) => [newUrl, ...prevUrls]);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CreateUrlForm onUrlCreated={handleUrlCreated} />
          </div>
          
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Short URLs</h2>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                {error}
              </div>
            )}
            
            {loading ? (
              <div className="bg-white p-8 rounded-lg shadow-md flex justify-center">
                <div className="animate-pulse text-blue-600">Loading your URLs...</div>
              </div>
            ) : (
              <UrlList 
                urls={urls} 
                onUrlDeleted={fetchUrls} 
                userId={currentUser._id}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
