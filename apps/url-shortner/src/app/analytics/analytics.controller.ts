import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { Analytics } from './schemas/analytics.schema';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post()
  async create(@Body() createAnalyticsDto: CreateAnalyticsDto): Promise<Analytics> {
    return this.analyticsService.create(createAnalyticsDto);
  }

  @Get(':urlShortnerId')
  async findByUrlShortner(@Param('urlShortnerId') urlShortnerId: string): Promise<Analytics[]> {
    return this.analyticsService.findByUrlShortner(urlShortnerId);
  }

  @Get('summary/:urlShortnerId')
  async getAnalyticsSummary(@Param('urlShortnerId') urlShortnerId: string): Promise<any> {
    return this.analyticsService.getAnalyticsSummary(urlShortnerId);
  }
}
