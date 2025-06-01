# URL Shortener - Project Structure

This document outlines the structure of the URL Shortener application, which consists of a NestJS backend and a React frontend.

## Root Directory

```
my-workspace/
├── apps/                     # Backend and frontend applications
│   ├── url-shortner/         # NestJS backend application
│   ├── url-shortner-e2e/     # Backend end-to-end tests
│   ├── web/                  # React frontend application
│   └── web-e2e/              # Frontend end-to-end tests
├── libs/                     # Shared libraries (if any)
├── tools/                    # Build and development tools
└── package.json              # Root package.json with all scripts
```

## Backend Structure (NestJS)

```
url-shortner/
├── src/
│   ├── app/
│   │   ├── analytics/                # Analytics module
│   │   │   ├── dto/                  # Data Transfer Objects
│   │   │   ├── schemas/              # MongoDB schemas
│   │   │   ├── analytics.controller.ts
│   │   │   ├── analytics.module.ts
│   │   │   └── analytics.service.ts
│   │   │
│   │   ├── url-shortner/            # URL shortener module
│   │   │   ├── dto/                  # Data Transfer Objects
│   │   │   ├── schemas/              # MongoDB schemas
│   │   │   ├── url-shortner.controller.ts
│   │   │   ├── url-shortner.module.ts
│   │   │   └── url-shortner.service.ts
│   │   │
│   │   ├── users/                   # Users module
│   │   │   ├── dto/                  # Data Transfer Objects
│   │   │   ├── schemas/              # MongoDB schemas
│   │   │   ├── users.controller.ts
│   │   │   ├── users.module.ts
│   │   │   └── users.service.ts
│   │   │
│   │   ├── app.controller.ts       # Main controller
│   │   ├── app.module.ts           # Root module
│   │   └── main.ts                 # Application entry file
│   ├── assets/                    # Static assets
│   ├── environments/              # Environment configurations
│   └── main.ts                    # Bootstrap file
└── test/                          # Test files
```

## Frontend Structure (React + TypeScript)

```
web/
├── public/                     # Static files
├── src/
│   ├── assets/                 # Images, fonts, etc.
│   ├── components/             # Reusable UI components
│   │   ├── analytics/          # Analytics-related components
│   │   ├── auth/               # Authentication components
│   │   ├── layout/             # Layout components (Header, Footer, etc.)
│   │   └── url/                # URL-related components
│   │
│   ├── contexts/              # React contexts
│   │   └── AuthContext.tsx     # Authentication context
│   │
│   ├── pages/                 # Page components
│   │   ├── AnalyticsPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── RedirectPage.tsx
│   │   └── RegisterPage.tsx
│   │
│   ├── routes/                # Application routes
│   │   └── index.tsx
│   │
│   ├── services/              # API services
│   │   └── api.ts
│   │
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts
│   │
│   ├── utils/                 # Utility functions
│   │   └── helpers.ts
│   │
│   ├── App.tsx                # Root component
│   ├── main.tsx                # Application entry point
│   └── styles.css              # Global styles
├── .env                        # Environment variables
└── package.json               # Frontend dependencies and scripts
```

## Database Schema

The application uses MongoDB with the following collections:

### Users Collection
```typescript
{
  _id: ObjectId,
  name: String,
  email: String,
  createdAt: Date,
  updatedAt: Date
}
```

### URL Shortener Collection
```typescript
{
  _id: ObjectId,
  longUrls: String,
  shortUrls: String,
  user: ObjectId | User,
  clickCounts: Number,
  expiredAt: Date,  // Optional
  deleted: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Analytics Collection
```typescript
{
  _id: ObjectId,
  urlShortnerId: ObjectId,
  browser: String,
  device: String,
  os: String,
  referrer: String,
  ipAddress: String,
  timestamp: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

### Backend (`.env` in root directory)
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/url_shortener
NODE_ENV=development
```

### Frontend (`.env` in web directory)
```
VITE_API_URL=http://localhost:3000/api
```

## API Endpoints

### User Endpoints
- `POST /users` - Create a new user
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `GET /users/email/:email` - Get user by email

### URL Shortener Endpoints
- `POST /url-shortner` - Create a new short URL
- `GET /url-shortner/user/:userId` - Get all URLs for a user
- `GET /url-shortner/:shortUrl` - Get URL by short code (redirects)
- `DELETE /url-shortner/:id` - Delete a URL

### Analytics Endpoints
- `GET /analytics/:urlShortnerId` - Get all analytics for a URL
- `GET /analytics/summary/:urlShortnerId` - Get analytics summary for a URL
- `POST /analytics` - Create a new analytics entry

## Development Workflow

1. **Setup**
   ```bash
   # Install dependencies
   npm install
   
   # Start MongoDB service
   # (Make sure MongoDB is installed and running locally)
   ```

2. **Running the application**
   ```bash
   # Start backend and frontend in development mode
   npm run start:dev
   
   # Or start them separately
   npm run start:api:dev    # Backend
   npm run start:web:dev    # Frontend
   ```

3. **Building for production**
   ```bash
   # Build both backend and frontend
   npm run build:prod
   
   # Start production server
   npm run start:api:prod
   ```

4. **Testing**
   ```bash
   # Run all tests
   npm test
   
   # Run backend tests
   npm run test:api
   
   # Run frontend tests
   npm run test:web
   ```

## Deployment

### Backend
1. Set up a MongoDB database (MongoDB Atlas recommended for production)
2. Configure environment variables in production
3. Build and start the production server:
   ```bash
   npm run build:api:prod
   npm run start:api:prod
   ```

### Frontend
1. Build the production bundle:
   ```bash
   cd web
   npm run build:prod
   ```
2. Deploy the contents of the `dist/web` directory to a static file server or CDN

## Troubleshooting

- **MongoDB connection issues**: Ensure MongoDB is running and the connection string is correct
- **CORS errors**: Verify the frontend URL is whitelisted in the backend CORS configuration
- **Environment variables**: Make sure all required environment variables are set in both development and production

## License

MIT
