import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UrlShortner } from '../../types';
import { urlShortenerAPI } from '../../services/api';

interface UrlListProps {
  urls: UrlShortner[];
  onUrlDeleted: () => void;
  userId: string;
}

const UrlList: React.FC<UrlListProps> = ({ urls, onUrlDeleted, userId }) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      setError('');
      await urlShortenerAPI.delete(id, userId);
      onUrlDeleted();
    } catch (err: any) {
      console.error('Error deleting URL:', err);
      setError(err.response?.data?.message || 'Failed to delete URL');
    } finally {
      setDeletingId(null);
    }
  };

  const getShortUrl = (shortCode: string) => {
    return `${window.location.origin}/s/${shortCode}`;
  };

  const copyToClipboard = (shortCode: string) => {
    const shortUrl = getShortUrl(shortCode);
    navigator.clipboard.writeText(shortUrl)
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };

  if (urls.length === 0) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <p className="text-gray-600">You haven't created any short URLs yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 m-4 rounded-md">
          {error}
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Short URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Original URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clicks
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expires
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {urls.map((url) => (
              <tr key={url._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <a 
                      href={getShortUrl(url.shortUrls)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {url.shortUrls}
                    </a>
                    <button 
                      onClick={() => copyToClipboard(url.shortUrls)}
                      className="text-gray-400 hover:text-gray-600"
                      title="Copy to clipboard"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs truncate" title={url.longUrls}>
                    {url.longUrls}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {url.clickCounts}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(url.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {url.expiredAt ? formatDate(url.expiredAt) : 'Never'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link 
                      to={`/analytics/${url._id}`}
                      className="text-indigo-600 hover:text-indigo-900 transition-colors"
                    >
                      Analytics
                    </Link>
                    <button
                      onClick={() => handleDelete(url._id)}
                      disabled={deletingId === url._id}
                      className="text-red-600 hover:text-red-900 transition-colors disabled:opacity-50"
                    >
                      {deletingId === url._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UrlList;
