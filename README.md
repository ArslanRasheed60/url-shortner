# URL Shortener Application

<div align="center">
  <h1>🔗 URL Shortener</h1>
  <p>A full-stack URL shortener application with analytics, built with NestJS, React, and MongoDB</p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)
  [![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
</div>

## 🌟 Features

- **URL Shortening**: Convert long URLs into short, shareable links
- **User Authentication**: Secure user registration and login
- **Analytics Dashboard**: Track clicks, referrers, and device information
- **Responsive Design**: Works on desktop and mobile devices
- **RESTful API**: Well-documented API endpoints
- **Modern Tech Stack**: Built with NestJS, React, TypeScript, and MongoDB

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or later)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-workspace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory:
     ```env
     # Backend
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/url_shortener
     NODE_ENV=development
     ```
   - Create a `.env` file in the `web` directory:
     ```env
     VITE_API_URL=http://localhost:3000/api
     ```

4. **Start the development servers**
   ```bash
   # Start both backend and frontend
   npm run start:dev
   
   # Or start them separately
   npm run start:api:dev    # Backend
   npm run start:web:dev    # Frontend
   ```

5. **Access the application**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3000
   - API Documentation: http://localhost:3000/api/docs

## 🛠 Project Structure

For a detailed project structure, please see [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).

## 📚 API Documentation

API documentation is available at `/api/docs` when running the backend in development mode. The API is built with OpenAPI (Swagger) and provides interactive documentation.

### Main API Endpoints

- **Users**
  - `POST /users` - Register a new user
  - `GET /users` - Get all users (admin only)
  - `GET /users/:id` - Get user by ID

- **URL Shortener**
  - `POST /url-shortner` - Create a new short URL
  - `GET /url-shortner/user/:userId` - Get URLs by user
  - `GET /s/:shortUrl` - Redirect to original URL
  - `DELETE /url-shortner/:id` - Delete a URL

- **Analytics**
  - `GET /analytics/:urlShortnerId` - Get analytics for a URL
  - `GET /analytics/summary/:urlShortnerId` - Get analytics summary

## 🧪 Testing

```bash
# Run all tests
npm test

# Run backend tests
npm run test:api

# Run frontend tests
npm run test:web

# Run e2e tests
npm run e2e:api
npm run e2e:web
```

## 🚀 Deployment

### Backend

1. Build the production bundle:
   ```bash
   npm run build:api:prod
   ```

2. Start the production server:
   ```bash
   NODE_ENV=production node dist/apps/url-shortner/main.js
   ```

### Frontend

1. Update the `VITE_API_URL` in `web/.env` to point to your production API

2. Build the production bundle:
   ```bash
   cd web
   npm run build:prod
   ```

3. Deploy the contents of `web/dist` to your hosting provider (Netlify, Vercel, etc.)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - A progressive Node.js framework
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [MongoDB](https://www.mongodb.com/) - The database for modern applications
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Nx](https://nx.dev/) - Smart, Fast and Extensible Build System
