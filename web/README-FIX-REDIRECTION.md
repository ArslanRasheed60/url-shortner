# URL Shortener Redirection Fix

## Issue Identified

There's a conflict in your backend NestJS application that's causing the URL redirection to fail. The `url-shortner.controller.ts` file contains two route handlers with the exact same path:

```typescript
// FIRST handler - This one redirects
@Get(':shortUrl')
async redirectToOriginalUrl(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
  // ...redirects to the original URL
}

// SECOND handler - This one returns data (conflicting with the first one)
@Get(':shortUrl')
async findByShortUrl(@Param('shortUrl') shortUrl: string): Promise<UrlShortner> {
  // ...returns the URL object
}
```

When the backend receives a request to `/url-shortner/d5wv1m`, it doesn't know which method to use - the redirect method or the data retrieval method.

## Fix Implementation

1. The frontend has been updated to use the correct URL format by removing the `/api` part when redirecting:
   ```typescript
   window.location.href = `${API_URL.replace('/api', '')}/url-shortner/${shortUrl}`;
   ```

2. **To fix the backend**, you need to update the controller to have different paths for these two handlers:

   ```typescript
   // For redirection (keep this one as is)
   @Get(':shortUrl')
   async redirectToOriginalUrl(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
     // ...redirects to the original URL
   }

   // For retrieving URL data (change the path)
   @Get('data/:shortUrl')
   async findByShortUrl(@Param('shortUrl') shortUrl: string): Promise<UrlShortner> {
     return this.urlShortnerService.findByShortUrl(shortUrl);
   }
   ```

3. Then update the frontend API service to use the new path:
   ```typescript
   getByShortUrl: async (shortUrl: string): Promise<UrlShortner> => {
     const response = await api.get<UrlShortner>(`/url-shortner/data/${shortUrl}`);
     return response.data;
   }
   ```

## Testing the Fix

After implementing these changes:
1. Start both backend and frontend servers
2. Create a short URL in your application
3. Navigate to the short URL (e.g., `http://localhost:4201/s/d5wv1m`)
4. You should be redirected to the original long URL

This fix will resolve the conflict in the backend routing while maintaining all functionality.
