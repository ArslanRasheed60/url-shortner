// Types for the URL Shortener application

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UrlShortner {
  _id: string;
  longUrls: string;
  shortUrls: string;
  user: string | User;
  clickCounts: number;
  expiredAt?: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Analytics {
  _id: string;
  urlShortnerId: string;
  browser: string;
  device: string;
  os: string;
  referrer: string;
  ipAddress: string;
  createdAt: string;
}

export interface AnalyticsSummary {
  totalClicks: number;
  browsers: Record<string, number>;
  devices: Record<string, number>;
  os: Record<string, number>;
  clicksByDay: Record<string, number>;
}

export interface CreateUrlShortnerDto {
  longUrls: string;
  userId: string;
  expiredAt?: string;
}
