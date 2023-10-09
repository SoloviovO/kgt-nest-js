import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({
    required: [true, 'Email is required!'],
    unique: true,
    trim: true,
    index: true,
  })
  email: string;

  @Prop({
    required: [true, 'Password is required!'],
    trim: true,
  })
  password?: string;

  @Prop()
  accessToken?: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
