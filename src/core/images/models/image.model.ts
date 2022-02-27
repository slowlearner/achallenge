import { prop } from '@typegoose/typegoose';
import { IsNumber } from 'class-validator';
import { Account } from 'src/core/accounts/models/account.model';

export class Image {
  _id?: string;
  @prop({
    ref: Account,
    required: [true, 'Device type is required'],
  })
  owner: Account;
  @IsNumber()
  @prop({ required: true })
  hits: number;
  @prop({ required: true })
  uri: string;
}
