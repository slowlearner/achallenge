import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Account } from './accounts/account.model';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsService } from './accounts/accounts.service';
import { AccountExistsValidator } from './accounts/validators/account-exists-validator';

@Module({
  imports: [TypegooseModule.forFeature([Account])],
  controllers: [AccountsController],
  providers: [AccountsService, AccountExistsValidator],
  exports: [AccountsService],
})
export class AccountModule {}
