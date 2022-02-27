// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { BearerStrategy } from './services/auth/bearer.strategy';
import { UsersService } from './services/users/users.service';

@Module({
  providers: [AuthService, UsersService, BearerStrategy],
  exports: [AuthService, UsersService],
  controllers: [],
})
export class CoreModule {}
