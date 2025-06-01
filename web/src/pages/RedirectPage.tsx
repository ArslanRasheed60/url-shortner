import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

// Get API URL from environment or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const RedirectPage: React.FC = () => {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      if (!shortUrl) {
        setError('Short URL not provided');
        return;
      }
      
      try {
        console.log('Redirecting using shortcode:', shortUrl);
        
        // Use the direct backend redirect endpoint
        // The backend is handling both the redirect and analytics in one request
        window.location.href = `${API_URL}/url-shortner/${shortUrl}`;
        
        // APPROACH 2 (Fallback): If the backend doesn't have a direct redirect endpoint
        // Uncomment this code if the direct approach doesn't work
        /*
        // Fetch the URL data first
        const response = await axios.get(`${API_URL}/url-shortner/${shortUrl}`);
        const urlData = response.data;
        
        if (!urlData || !urlData.longUrls) {
          setError('Invalid URL data received');
          return;
        }
        
        // Ensure the URL has a protocol
        let targetUrl = urlData.longUrls;
        if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
          targetUrl = 'https://' + targetUrl;
        }
        
        console.log('Redirecting to:', targetUrl);
        
        // Create an analytics entry (if your API supports this)
        try {
          await axios.post(`${API_URL}/analytics`, {
            urlShortnerId: urlData._id,
            browser: navigator.userAgent,
            device: 'Unknown', // You can add device detection logic here
            os: navigator.platform
          });
        } catch (analyticsErr) {
          console.error('Failed to record analytics:', analyticsErr);
          // Continue with redirect even if analytics fails
        }
        
        // Redirect to the original URL
        window.location.href = targetUrl;
        */
      } catch (err: any) {
        console.error('Error redirecting:', err);
        const errorMessage = err.response?.data?.message || 'URL not found or has expired';
        console.error('Error details:', errorMessage);
        setError(errorMessage);
      }
    };
    
    redirectToOriginalUrl();
  }, [shortUrl]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {error ? (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            to="/"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Redirecting...</h1>
          <p className="text-gray-600">You are being redirected to the original URL.</p>
        </div>
      )}
    </div>
  );
};

export default RedirectPage;
