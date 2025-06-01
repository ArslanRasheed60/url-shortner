import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UrlShortner, UrlShortnerDocument } from './schemas/url-shortner.schema';
import { CreateUrlShortnerDto } from './dto/create-url-shortner.dto';
import { UsersService } from '../users/users.service';
import { randomBytes } from 'crypto';

@Injectable()
export class UrlShortnerService {
  constructor(
    @InjectModel(UrlShortner.name) private urlShortnerModel: Model<UrlShortnerDocument>,
    private readonly usersService: UsersService,
  ) {}

  private generateShortCode(length = 6): string {
    return randomBytes(length).toString('base64')
      .replace(/[+/]/g, '')
      .substring(0, length)
      .toLowerCase();
  }

  async create(createUrlShortnerDto: CreateUrlShortnerDto): Promise<UrlShortner> {
    // Verify user exists
    await this.usersService.findById(createUrlShortnerDto.userId);

    // Check if URL already exists for this user
    const existingUrl = await this.urlShortnerModel.findOne({
      longUrls: createUrlShortnerDto.longUrls,
      user: createUrlShortnerDto.userId,
    });

    if (existingUrl) {
      return existingUrl;
    }

    // Generate unique short URL
    let shortCode: string;
    let isUnique = false;
    while (!isUnique) {
      shortCode = this.generateShortCode();
      const existingShortUrl = await this.urlShortnerModel.findOne({ shortUrls: shortCode });
      if (!existingShortUrl) {
        isUnique = true;
      }
    }

    // Create new URL shortener entry
    const newUrlShortner = new this.urlShortnerModel({
      longUrls: createUrlShortnerDto.longUrls,
      shortUrls: shortCode,
      user: createUrlShortnerDto.userId,
      expiredAt: createUrlShortnerDto.expiredAt,
      deleted: false 
    });

    // Save the URL shortener entry
    const savedUrlShortner = await newUrlShortner.save();
    
    // Populate the user field after saving
    await savedUrlShortner.populate('user');

    return savedUrlShortner;
  }

  async findByShortUrl(shortUrl: string): Promise<UrlShortner> {
    const urlShortner = await this.urlShortnerModel.findOne({ 
      shortUrls: shortUrl, 
      deleted: false 
    }).populate('user');

    if (!urlShortner) {
      throw new NotFoundException('Short URL not found');
    }

    return urlShortner;
  }

  async incrementClickCount(shortUrl: string): Promise<void> {
    const urlShortner = await this.urlShortnerModel.findOne({ 
      shortUrls: shortUrl, 
      deleted: false 
    });

    if (!urlShortner) {
      throw new NotFoundException('Short URL not found');
    }

    urlShortner.clickCounts++;
    await urlShortner.save();
  }

  async findAllByUser(userId: string): Promise<UrlShortner[]> {
    // Verify user exists
    await this.usersService.findById(userId);

    return this.urlShortnerModel.find({ 
      user: userId, 
      deleted: false 
    }).exec();
  }

  async deleteUrlShortner(id: string, userId: string): Promise<UrlShortner> {
    const urlShortner = await this.urlShortnerModel.findOneAndUpdate(
      { _id: id, user: userId },
      { deleted: true },
      { new: true }
    );

    if (!urlShortner) {
      throw new NotFoundException('URL not found or unauthorized');
    }

    return urlShortner;
  }
}
