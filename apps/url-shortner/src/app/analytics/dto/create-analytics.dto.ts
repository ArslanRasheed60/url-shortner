import { IsNotEmpty, IsString, IsOptional, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class GeographicDistributionDto {
  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  latitude?: number;

  @IsOptional()
  longitude?: number;
}

class DeviceTypeDto {
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  version?: string;
}

export class CreateAnalyticsDto {
  @IsNotEmpty()
  @IsString()
  urlShortnerId: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => GeographicDistributionDto)
  geographicDistribution?: GeographicDistributionDto;

  @IsOptional()
  @IsString()
  referrerSource?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => DeviceTypeDto)
  deviceType?: DeviceTypeDto;
}
