import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Analytics, AnalyticsDocument } from './schemas/analytics.schema';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UrlShortnerService } from '../url-shortner/url-shortner.service';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Analytics.name) private analyticsModel: Model<AnalyticsDocument>,
    private readonly urlShortnerService: UrlShortnerService,
  ) {}

  async create(createAnalyticsDto: CreateAnalyticsDto): Promise<Analytics> {
    // Verify URL shortner exists
    await this.urlShortnerService.findByShortUrl(createAnalyticsDto.urlShortnerId);

    const analytics = new this.analyticsModel(createAnalyticsDto);
    return analytics.save();
  }

  async findByUrlShortner(urlShortnerId: string): Promise<Analytics[]> {
    // Verify URL shortner exists
    await this.urlShortnerService.findByShortUrl(urlShortnerId);

    return this.analyticsModel.find({ urlShortner: urlShortnerId }).exec();
  }

  async getAnalyticsSummary(urlShortnerId: string): Promise<any> {
    // Verify URL shortner exists
    await this.urlShortnerService.findByShortUrl(urlShortnerId);

    const analytics = await this.analyticsModel.find({ urlShortner: urlShortnerId });

    // Aggregate analytics
    const summary = {
      totalClicks: analytics.length,
      geographicDistribution: this.aggregateGeographicData(analytics),
      referrerSources: this.aggregateReferrerSources(analytics),
      deviceTypes: this.aggregateDeviceTypes(analytics),
    };

    return summary;
  }

  private aggregateGeographicData(analytics: Analytics[]): any {
    const geoData = {};
    analytics.forEach(entry => {
      if (entry.geographicDistribution?.country) {
        const country = entry.geographicDistribution.country;
        geoData[country] = (geoData[country] || 0) + 1;
      }
    });
    return geoData;
  }

  private aggregateReferrerSources(analytics: Analytics[]): any {
    const referrers = {};
    analytics.forEach(entry => {
      if (entry.referrerSource) {
        referrers[entry.referrerSource] = (referrers[entry.referrerSource] || 0) + 1;
      }
    });
    return referrers;
  }

  private aggregateDeviceTypes(analytics: Analytics[]): any {
    const devices = {};
    analytics.forEach(entry => {
      if (entry.deviceType?.type) {
        const deviceType = entry.deviceType.type;
        devices[deviceType] = (devices[deviceType] || 0) + 1;
      }
    });
    return devices;
  }
}
