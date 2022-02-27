import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { AccountModule } from './account/account.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [CoreModule, AccountModule, ImageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
