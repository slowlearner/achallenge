// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { AccountModule } from './account/account.module';
import { ImageModule } from './image/image.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { logger, LoggerEvent } from './core/logger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { logExecutionTime } = require('mongoose-execution-time');
mongoose.plugin(logExecutionTime, {
  loggerFunction: (
    operation,
    collectionName,
    executionTimeMS,
    // filter,
    // update,
    // additionalLogProperties,
  ) => {
    logger.info({
      event: LoggerEvent.MONGO_QUERY,
      collection: collectionName,
      latency: executionTimeMS,
      operation,
    });
  },
});
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
