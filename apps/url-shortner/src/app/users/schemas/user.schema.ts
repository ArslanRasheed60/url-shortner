import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UrlShortner } from '../../url-shortner/schemas/url-shortner.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'UrlShortner' }] })
  urlShortners: UrlShortner[];
}

export const UserSchema = SchemaFactory.createForClass(User);
