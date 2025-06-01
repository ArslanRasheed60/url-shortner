import { IsNotEmpty, IsString, IsUrl, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUrlShortnerDto {
  @IsNotEmpty()
  @IsUrl()
  longUrls: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiredAt?: Date;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
