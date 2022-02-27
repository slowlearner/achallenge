import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CoreModule } from 'src/core/core.module';
import { ImagesController } from './images/images.controller';
import { ImagesService } from './images/images.service';
import { Image } from './images/models/image.model';

@Module({
  imports: [CoreModule, TypegooseModule.forFeature([Image])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImageModule {}
