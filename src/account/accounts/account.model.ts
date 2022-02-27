import { prop } from '@typegoose/typegoose';
import { IsString } from 'class-validator';

export class Account {
  @IsString()
  @prop({ required: true })
  email: string;
  @prop({ required: true })
  password: string;
}
