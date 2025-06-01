# URL Shortener Analytics Fix

## Issue Identified

There's a routing conflict in your NestJS backend analytics controller that's causing 404 errors when trying to view analytics. The issue is in the `analytics.controller.ts` file where two route handlers have conflicting paths:

```typescript
// In analytics.controller.ts
@Get(':urlShortnerId')
async findByUrlShortner(@Param('urlShortnerId') urlShortnerId: string) { ... }

@Get('summary/:urlShortnerId')
async getAnalyticsSummary(@Param('urlShortnerId') urlShortnerId: string) { ... }
```

In NestJS, route order matters. The more specific route (`summary/:urlShortnerId`) needs to be defined before the more generic one (`:urlShortnerId`). Since it's not, requests to `/analytics/summary/:id` are being captured by the first route handler, causing 404 errors.

## Frontend Fix Implemented

I've updated the frontend API service to work around this issue by using a query parameter approach:

```typescript
getSummary: async (urlShortnerId: string): Promise<AnalyticsSummary> => {
  // Use a workaround for the routing conflict by adding a query parameter
  // This ensures our request doesn't match the generic ":urlShortnerId" route
  const response = await api.get<AnalyticsSummary>(`/analytics/${urlShortnerId}`, {
    params: {
      summary: true
    }
  });
  return response.data;
}
```

## Backend Fix Needed

You need to update your backend controller to handle the query parameter:

1. Update `analytics.controller.ts`:

```typescript
@Get(':urlShortnerId')
async findByUrlShortner(
  @Param('urlShortnerId') urlShortnerId: string,
  @Query('summary') summary?: boolean
): Promise<Analytics[] | any> {
  if (summary) {
    // If summary query param is present, return summary data
    return this.analyticsService.getAnalyticsSummary(urlShortnerId);
  }
  // Otherwise return regular analytics data
  return this.analyticsService.findByUrlShortner(urlShortnerId);
}

// You can remove or comment out this method since we're now handling it in the method above
// @Get('summary/:urlShortnerId')
// async getAnalyticsSummary(@Param('urlShortnerId') urlShortnerId: string): Promise<any> {
//   return this.analyticsService.getAnalyticsSummary(urlShortnerId);
// }
```

2. Don't forget to add the Query import:

```typescript
import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
```

## Proper Backend Fix (Alternative)

The better solution for the backend would be to rearrange the routes so the more specific one comes first:

```typescript
import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post()
  async create(@Body() createAnalyticsDto: CreateAnalyticsDto): Promise<Analytics> {
    return this.analyticsService.create(createAnalyticsDto);
  }

  @Get('summary/:urlShortnerId')  // More specific route comes FIRST
  async getAnalyticsSummary(@Param('urlShortnerId') urlShortnerId: string): Promise<any> {
    return this.analyticsService.getAnalyticsSummary(urlShortnerId);
  }

  @Get(':urlShortnerId')  // Generic route comes SECOND
  async findByUrlShortner(@Param('urlShortnerId') urlShortnerId: string): Promise<Analytics[]> {
    return this.analyticsService.findByUrlShortner(urlShortnerId);
  }
}
```

This would fix the issue without requiring frontend changes, but since we've already modified the frontend, the query parameter approach will work for now.

## Testing the Fix

After implementing these changes:
1. Start both backend and frontend servers
2. Create a short URL in your application
3. Navigate to the analytics page for that URL
4. You should now see the analytics data without any 404 errors
