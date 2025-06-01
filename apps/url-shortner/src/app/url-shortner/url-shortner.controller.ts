import { Controller, Post, Body, Get, Param, Delete, Query, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { UrlShortnerService } from './url-shortner.service';
import { CreateUrlShortnerDto } from './dto/create-url-shortner.dto';
import { UrlShortner } from './schemas/url-shortner.schema';

@ApiTags('URL Shortener')
@Controller('url-shortner')
export class UrlShortnerController {
  constructor(private readonly urlShortnerService: UrlShortnerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shortened URL' })
  @ApiResponse({ status: 201, description: 'URL successfully shortened' })
  async create(@Body() createUrlShortnerDto: CreateUrlShortnerDto): Promise<UrlShortner> {
    return this.urlShortnerService.create(createUrlShortnerDto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all shortened URLs by user' })
  @ApiResponse({ status: 200, description: 'URLs successfully retrieved' })
  async findAllByUser(@Param('userId') userId: string): Promise<UrlShortner[]> {
    return this.urlShortnerService.findAllByUser(userId);
  }

  @Get(':shortUrl')
  @ApiOperation({ summary: 'Redirect to original long URL' })
  @ApiResponse({ status: 302, description: 'Redirect to original URL' })
  async redirectToOriginalUrl(
    @Param('shortUrl') shortUrl: string, 
    @Res() res: Response
  ) {
    const urlEntry = await this.urlShortnerService.findByShortUrl(shortUrl);
    
    // Increment click count
    await this.urlShortnerService.incrementClickCount(shortUrl);

    // Redirect to the original long URL
    return res.redirect(HttpStatus.FOUND, urlEntry.longUrls);
  }

  @Get(':shortUrl')
  async findByShortUrl(@Param('shortUrl') shortUrl: string): Promise<UrlShortner> {
    return this.urlShortnerService.findByShortUrl(shortUrl);
  }

  @Delete(':id')
  async deleteUrlShortner(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ): Promise<UrlShortner> {
    return this.urlShortnerService.deleteUrlShortner(id, userId);
  }
}
