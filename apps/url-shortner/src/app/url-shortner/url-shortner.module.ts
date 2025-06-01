import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlShortnerService } from './url-shortner.service';
import { UrlShortnerController } from './url-shortner.controller';
import { UrlShortner, UrlShortnerSchema } from './schemas/url-shortner.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UrlShortner.name, schema: UrlShortnerSchema }]),
    UsersModule,
  ],
  controllers: [UrlShortnerController],
  providers: [UrlShortnerService],
  exports: [UrlShortnerService],
})
export class UrlShortnerModule {}
