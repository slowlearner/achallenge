// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Account } from './account.model';
import { CreateAccountDto } from './dto/create-account-dto';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/core/constants';
import * as _ from 'lodash';
import { ROLE_USER } from 'src/core/rbac';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import * as uuid from 'uuid';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account)
    private readonly accountModel: ReturnModelType<typeof Account>,
    @InjectSendGrid() private readonly client: SendGridService,
  ) {}

  async createPasswordHash(password: string) {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    return hash;
  }
  async create(account: CreateAccountDto): Promise<Account> {
    const hash = await this.createPasswordHash(account.password);
    // automatically assign a user role to a created account
    account.role = ROLE_USER;
    account.password = hash;
    const createdAccount = new this.accountModel(account);

    return await createdAccount.save();
  }
  async findByEmail(email: string): Promise<Account> {
    return await this.accountModel
      .findOne({
        email: email,
      })
      .lean();
  }

  async createPasswordResetRequest(email: string) {
    const account = await this.findByEmail(email);
    if (!account) {
      throw new Error('Could not find account');
    }
    const token = uuid.v4();

    await this.accountModel.updateOne(
      {
        _id: account._id,
      },
      {
        passwordResetToken: token,
        passwordResetTokenGenerationDate: new Date(),
      },
    );

    await this.client.send({
      from: process.env.EMAIL_FROM,
      to: account.email,
      subject: 'Password Reset Request',
      text: `Password reset token: ${token}`,
    });
  }
  async updatePassword(token: string, password: string) {
    const account = await this.accountModel.findOne({
      passwordResetToken: token,
    });

    if (account) {
      const hash = await this.createPasswordHash(password);
      return await this.accountModel.updateOne(
        {
          _id: account._id,
        },
        {
          password: hash,
          passwordResetToken: '',
          passwordResetTokenGenerationDate: null,
        },
      );
    }
    throw new Error('Invalid token');
  }
}
