# URL Shortener - Frontend

A modern, responsive frontend for the URL Shortener application. This frontend is built with React, React Router, and Tailwind CSS, and interacts with the NestJS backend API.

## Features

- **User Authentication**: Register and login functionality
- **URL Shortening**: Create short URLs from long ones
- **Dashboard**: Manage all your shortened URLs
- **Analytics**: View detailed statistics about your links
- **Responsive Design**: Works on all devices (mobile, tablet, desktop)

## Tech Stack

- **React**: UI library
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js & React-Chartjs-2**: Data visualization
- **Axios**: HTTP client for API requests

## Application Structure

- **`src/components/`**: Reusable UI components
  - **`auth/`**: Authentication-related components
  - **`layout/`**: Layout components (Header, Footer)
  - **`url/`**: URL shortener components
  - **`analytics/`**: Analytics and charts components
  - **`common/`**: Common utilities like ErrorBoundary

- **`src/pages/`**: Page components
  - `HomePage.tsx`: Landing page
  - `LoginPage.tsx`: User login
  - `RegisterPage.tsx`: User registration
  - `DashboardPage.tsx`: User dashboard with URL management
  - `AnalyticsPage.tsx`: Detailed analytics for a URL
  - `RedirectPage.tsx`: Handles URL redirections
  - `NotFoundPage.tsx`: 404 page

- **`src/contexts/`**: React contexts
  - `AuthContext.tsx`: Authentication state management

- **`src/services/`**: API services
  - `api.ts`: API client and endpoints

- **`src/utils/`**: Utility functions
  - `helpers.ts`: Common helper functions

- **`src/routes/`**: Application routing
  - `index.tsx`: Route definitions

- **`src/types/`**: TypeScript type definitions

## Getting Started

### Prerequisites

- Node.js (>= 16)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run start:web
   ```

2. To run both frontend and backend concurrently:
   ```bash
   npm run start
   ```

### Building for Production

```bash
npm run build:web:prod
```

## API Integration

The frontend communicates with the following backend APIs:

- **User API**:
  - POST `/users`: Create a new user
  - GET `/users`: Get all users
  - GET `/users/:id`: Get user by ID
  - GET `/users/email/:email`: Get user by email

- **URL Shortener API**:
  - POST `/url-shortner`: Create a new short URL
  - GET `/url-shortner/user/:userId`: Get all URLs for a user
  - GET `/url-shortner/:shortUrl`: Get URL details by short code
  - DELETE `/url-shortner/:id`: Delete a URL

- **Analytics API**:
  - GET `/analytics/:urlShortnerId`: Get all analytics for a URL
  - GET `/analytics/summary/:urlShortnerId`: Get analytics summary for a URL

## Features Implementation

1. **Authentication**:
   - Simple email-based authentication
   - User state persisted in localStorage

2. **URL Management**:
   - Create short URLs with optional expiry date
   - View and manage all your URLs
   - Copy short URLs to clipboard
   - Delete URLs

3. **Analytics**:
   - View total clicks
   - See click distribution by day
   - Analyze visitor demographics (browser, device, OS)
   - Visual charts and graphs

## License

MIT
