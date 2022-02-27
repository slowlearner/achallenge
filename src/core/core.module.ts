import { Module } from '@nestjs/common';
import { TestController } from './controllers/test/test.controller';
import { AuthService } from './services/auth/auth.service';
import { BearerStrategy } from './services/auth/bearer.strategy';
import { UsersService } from './services/users/users.service';
import { ImagesController } from './images/images.controller';

@Module({
  providers: [AuthService, UsersService, BearerStrategy],
  exports: [AuthService, UsersService],
  controllers: [TestController, ImagesController],
})
export class CoreModule {}
