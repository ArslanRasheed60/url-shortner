import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { UrlShortnerModule } from './url-shortner/url-shortner.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/url_shortener'),
    UsersModule,
    UrlShortnerModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
