import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import { RBAcGuard, RBAcPermissions } from 'nestjs-rbac';
import { ImageListDto, ImageListResponseDto } from './dto/images.dto';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
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
