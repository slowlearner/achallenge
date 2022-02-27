import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Account } from './account.model';
import { CreateAccountDto } from './dto/create-account-dto';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/core/constants';
import * as _ from 'lodash';
import { ROLE_USER } from 'src/core/rbac';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account)
    private readonly accountModel: ReturnModelType<typeof Account>,
  ) {}
  async create(account: CreateAccountDto): Promise<Account> {
    const hash = await bcrypt.hash(account.password, SALT_ROUNDS);
    // automatically assign a user role to a created account
    account.roles = [ROLE_USER];
    account.password = hash;
    const createdAccount = new this.accountModel(account);

    return await createdAccount.save();
  }
  async findByEmail(email: string): Promise<Account> {
    return await this.accountModel.findOne({
      email: email,
    });
  }
}
