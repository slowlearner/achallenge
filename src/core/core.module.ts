// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypegooseModule } from 'nestjs-typegoose';
import { Account } from './accounts/account.model';
import { AccountsService } from './accounts/accounts.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { ConfigService } from './config/config.service';
import { JWT_SECRET } from './constants';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AccountsController } from './accounts/accounts.controller';
import { AccountExistsValidator } from './accounts/validators/account-exists-validator';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypegooseModule.forFeature([Account]),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    AccountsService,
    ConfigService,
    AccountExistsValidator,
  ],
  exports: [AuthService, AccountsService, ConfigService, JwtModule],
  controllers: [AuthController, AccountsController],
})
export class CoreModule {}
