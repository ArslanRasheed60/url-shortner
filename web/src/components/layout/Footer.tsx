import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">URL Shortener</h3>
            <p className="text-gray-400 text-sm">
              A modern, fast, and efficient way to create and manage shortened URLs. 
              Track clicks and analyze your link performance with detailed analytics.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/analytics" className="hover:text-white transition-colors">Analytics</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">
              Have questions or suggestions? <br />
              <a href="mailto:support@urlshortener.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                support@urlshortener.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© {currentYear} URL Shortener. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
