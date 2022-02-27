// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ImageModule } from './image/image.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { logger, LoggerEvent } from './core/logger';
import { RBAcModule } from 'nestjs-rbac';
import { RBAC } from './core/rbac';
import { JwtModule } from '@nestjs/jwt';

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
    RBAcModule.forRoot(RBAC),
    TypegooseModule.forRoot(`${process.env.MONGODB_URL}`, {}),
    CoreModule,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
