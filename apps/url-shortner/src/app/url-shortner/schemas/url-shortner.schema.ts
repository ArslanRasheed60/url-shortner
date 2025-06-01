import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Analytics } from '../../analytics/schemas/analytics.schema';

export type UrlShortnerDocument = HydratedDocument<UrlShortner>;

@Schema({ timestamps: true })
export class UrlShortner {
  @Prop({ required: true })
  longUrls: string;

  @Prop({ required: true, unique: true })
  shortUrls: string;

  @Prop({ default: null })
  expiredAt: Date;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ default: 0 })
  clickCounts: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Analytics' }] })
  analytics: Analytics[];
}

export const UrlShortnerSchema = SchemaFactory.createForClass(UrlShortner);
