import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RBAcGuard, RBAcPermissions } from 'nestjs-rbac';
import { ImageListDto, ImageListResponseDto } from './dto/images.dto';
import { ImagesService } from './images.service';
import { Image } from './models/image.model';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Patch(':id')
  @RBAcPermissions('images@update')
  @UseGuards(AuthGuard('jwt'), RBAcGuard)
  @ApiOkResponse({
    type: Image,
  })
  async update(@Param('id') id: string, @Req() request: any): Promise<Image> {
    const image = await this.imagesService.getById(id);
    if (!image) {
      throw new HttpException(new Error(), HttpStatus.NOT_FOUND);
    }
    return image;
  }

  @Get(':id')
  @RBAcPermissions('images@get')
  @UseGuards(AuthGuard('jwt'), RBAcGuard)
  @ApiOkResponse({
    type: Image,
  })
  async get(@Param('id') id: string, @Req() request: any): Promise<Image> {
    const image = await this.imagesService.getById(id);
    if (!image) {
      throw new HttpException(new Error(), HttpStatus.NOT_FOUND);
    }
    return image;
  }

  @RBAcPermissions('images@list')
  @UseGuards(AuthGuard('jwt'), RBAcGuard)
  @Get()
  @ApiOkResponse({
    type: ImageListResponseDto,
  })
  async list(
    @Query() query: ImageListDto,
    @Req() request: any,
  ): Promise<ImageListResponseDto> {
    let limit = 5;
    if (query.limit) {
      limit = query.limit <= 10 ? query.limit : limit;
    }
    const result = await this.imagesService.getRandomPhotos(
      request.user,
      limit,
    );
    return {
      limit: limit,
      data: result,
    };
  }
}
