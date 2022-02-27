// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { AccountModule } from './account/account.module';
import { ImageModule } from './image/image.module';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forRoot(`${process.env.MONGODB_URL}`, {}),
    CoreModule,
    AccountModule,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
