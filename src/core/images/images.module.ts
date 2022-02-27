import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CoreModule } from 'src/core/core.module';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { Image } from './models/image.model';

@Module({
  imports: [CoreModule, TypegooseModule.forFeature([Image])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImageModule {}
