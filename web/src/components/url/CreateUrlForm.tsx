import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { urlShortenerAPI } from '../../services/api';
import { UrlShortner } from '../../types';

interface CreateUrlFormProps {
  onUrlCreated?: (url: UrlShortner) => void;
}

const CreateUrlForm: React.FC<CreateUrlFormProps> = ({ onUrlCreated }) => {
  const [longUrl, setLongUrl] = useState('');
  const [expiry, setExpiry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [createdUrl, setCreatedUrl] = useState<UrlShortner | null>(null);
  
  const { currentUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!longUrl) {
      setError('URL is required');
      return;
    }
    
    if (!currentUser) {
      setError('You need to be logged in to create a short URL');
      return;
    }
    
    // Basic URL validation
    try {
      new URL(longUrl); // This will throw if URL is invalid
    } catch (err) {
      setError('Please enter a valid URL (including http:// or https://)');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      const data = {
        longUrls: longUrl,
        userId: currentUser._id,
        ...(expiry ? { expiredAt: new Date(expiry).toISOString() } : {})
      };
      
      const newUrl = await urlShortenerAPI.create(data);
      setCreatedUrl(newUrl);
      setSuccess('Short URL created successfully!');
      setLongUrl('');
      setExpiry('');
      
      if (onUrlCreated) {
        onUrlCreated(newUrl);
      }
    } catch (err: any) {
      console.error('Error creating short URL:', err);
      setError(err.response?.data?.message || 'Failed to create short URL');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getShortUrl = () => {
    if (!createdUrl) return '';
    return `${window.location.origin}/s/${createdUrl.shortUrls}`;
  };

  const copyToClipboard = () => {
    const shortUrl = getShortUrl();
    navigator.clipboard.writeText(shortUrl)
      .then(() => {
        setSuccess('URL copied to clipboard!');
        setTimeout(() => setSuccess(''), 3000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        setError('Failed to copy to clipboard');
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Create Short URL</h2>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="longUrl" className="block text-gray-700 font-medium mb-2">
            Long URL
          </label>
          <input
            type="text"
            id="longUrl"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/very/long/url/to/shorten"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="expiry" className="block text-gray-700 font-medium mb-2">
            Expiry Date (Optional)
          </label>
          <input
            type="date"
            id="expiry"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={new Date().toISOString().split('T')[0]}
            disabled={isSubmitting}
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
        >
          {isSubmitting ? 'Creating...' : 'Create Short URL'}
        </button>
      </form>
      
      {createdUrl && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Your Short URL</h3>
          <div className="flex items-center">
            <input
              type="text"
              value={getShortUrl()}
              readOnly
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className="bg-gray-200 px-4 py-2 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-300 focus:outline-none transition-colors"
            >
              Copy
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Click Count: {createdUrl.clickCounts}
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateUrlForm;
