import { Module } from '@nestjs/common';
import { TestController } from './controllers/test/test.controller';
import { AuthService } from './services/auth/auth.service';
import { BearerStrategy } from './services/auth/bearer.strategy';
import { UsersService } from './services/users/users.service';

@Module({
  providers: [AuthService, UsersService, BearerStrategy],
  exports: [AuthService, UsersService],
  controllers: [TestController],
})
export class CoreModule {}
