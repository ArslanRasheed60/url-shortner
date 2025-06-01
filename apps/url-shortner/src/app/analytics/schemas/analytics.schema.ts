import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UrlShortner } from '../../url-shortner/schemas/url-shortner.schema';

export type AnalyticsDocument = HydratedDocument<Analytics>;

@Schema({ timestamps: true })
export class Analytics {
  @Prop({ type: Types.ObjectId, ref: 'UrlShortner', required: true })
  urlShortner: UrlShortner;

  @Prop({ 
    type: {
      country: { type: String, default: '' },
      city: { type: String, default: '' },
      latitude: { type: Number, default: 0 },
      longitude: { type: Number, default: 0 }
    },
    default: () => ({
      country: '',
      city: '',
      latitude: 0,
      longitude: 0
    })
  })
  geographicDistribution: {
    country: string;
    city: string;
    latitude: number;
    longitude: number;
  };

  @Prop({ default: null })
  referrerSource: string;

  @Prop({
    type: {
      type: { type: String, default: '' },
      name: { type: String, default: '' },
      version: { type: String, default: '' }
    }
  })
  deviceType: {
    type: string;
    name: string;
    version: string;
  } = {
    type: '',
    name: '',
    version: ''
  };
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);
