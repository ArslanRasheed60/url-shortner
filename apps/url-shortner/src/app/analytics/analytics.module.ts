import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { Analytics, AnalyticsSchema } from './schemas/analytics.schema';
import { UrlShortnerModule } from '../url-shortner/url-shortner.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Analytics.name, schema: AnalyticsSchema }]),
    UrlShortnerModule,
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
