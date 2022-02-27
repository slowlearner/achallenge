import { prop } from '@typegoose/typegoose';
import { IsString } from 'class-validator';

export class Account {
  _id: string;
  @IsString()
  @prop({ required: true })
  email: string;
  @prop({ required: true })
  password: string;
  @prop({ required: true })
  role: string;

  @prop()
  passwordResetToken: string;
  @prop()
  passwordResetTokenGenerationDate: Date;
}
