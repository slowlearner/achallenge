import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { ImagesController } from './images/images.controller';

@Module({
  imports: [CoreModule],
  controllers: [ImagesController],
})
export class ImageModule {}
