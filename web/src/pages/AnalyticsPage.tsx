import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import AnalyticsSummary from '../components/analytics/AnalyticsSummary';
import { useAuth } from '../contexts/AuthContext';
import { analyticsAPI, urlShortenerAPI } from '../services/api';
import { AnalyticsSummary as AnalyticsSummaryType, UrlShortner } from '../types';

const AnalyticsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const [url, setUrl] = useState<UrlShortner | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsSummaryType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const urlData = await urlShortenerAPI.getAllByUser(currentUser._id);
        const urlInfo = urlData.find(u => u._id === id);
        
        if (!urlInfo) {
          setError('URL not found or you do not have access to view it');
          setLoading(false);
          return;
        }
        
        setUrl(urlInfo);
        
        const analyticsSummary = await analyticsAPI.getSummary(id);
        setAnalytics(analyticsSummary);
      } catch (err: any) {
        console.error('Error fetching analytics:', err);
        setError(err.response?.data?.message || 'Failed to fetch analytics data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, currentUser._id]);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center mb-8">
          <Link 
            to="/dashboard" 
            className="text-blue-600 hover:text-blue-800 mr-4 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Link Analytics</h1>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        {url && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2">URL Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Short URL</p>
                <p className="font-medium text-blue-600">
                  <a 
                    href={`${window.location.origin}/s/${url.shortUrls}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {url.shortUrls}
                  </a>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Original URL</p>
                <p className="font-medium truncate" title={url.longUrls}>
                  {url.longUrls}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created On</p>
                <p className="font-medium">
                  {new Date(url.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Clicks</p>
                <p className="font-medium">{url.clickCounts}</p>
              </div>
            </div>
          </div>
        )}
        
        <AnalyticsSummary 
          data={analytics || {
            totalClicks: 0,
            browsers: {},
            devices: {},
            os: {},
            clicksByDay: {}
          }} 
          isLoading={loading} 
        />
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
