import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RBAcGuard, RBAcPermissions } from 'nestjs-rbac';
import { Account } from '../accounts/account.model';
import { BaseService } from '../common/base.service';
import { ForbiddenError, NotFoundError } from '../common/error';
import { SessionAccount } from '../common/session-account.decorator';
import { ROLE_ADMINISTRATOR, ROLE_USER } from '../rbac';
import {
  CreateImageDto,
  ImageListDto,
  ImageListResponseDto,
  UpdateImageDto,
} from './dto/images.dto';
import { ImagesService } from './images.service';
import { Image } from './models/image.model';

@ApiTags('Images')
@Controller('images')
export class ImagesController extends BaseService {
  constructor(private readonly imagesService: ImagesService) {
    super();
  }

  @Patch(':id')
  @RBAcPermissions('images@update')
  @UseGuards(AuthGuard('jwt'), RBAcGuard)
  @ApiOkResponse({
    type: Image,
  })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateImageDto,
    @SessionAccount() account: Account,
  ): Promise<Image> {
    let image = await this.imagesService.getById(id);
    if (account.role === ROLE_USER && !this.owns(account._id, image)) {
      throw new HttpException(ForbiddenError, HttpStatus.FORBIDDEN);
    }

    image = await this.imagesService.update(id, <any>{
      hits: body.hits,
      uri: body.uri,
    });
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
  async get(
    @Param('id') id: string,
    @SessionAccount() account: Account,
  ): Promise<Image> {
    const image = await this.imagesService.getById(id);
    if (!image) {
      throw new HttpException(NotFoundError, HttpStatus.NOT_FOUND);
    }

    if (account.role === ROLE_USER && !this.owns(account._id, image)) {
      throw new HttpException(ForbiddenError, HttpStatus.FORBIDDEN);
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

  @RBAcPermissions('images@create')
  @UseGuards(AuthGuard('jwt'), RBAcGuard)
  @Post()
  @ApiOkResponse({
    type: Image,
  })
  async create(
    @Body() body: CreateImageDto,
    @Req() request: any,
    @SessionAccount() account: Account,
  ): Promise<Image> {
    let owner = account._id;
    if (body.owner && account.role === ROLE_ADMINISTRATOR) {
      owner = body.owner;
    }
    return await this.imagesService.create({
      hits: 1,
      owner: <any>owner,
      uri: body.uri,
    });
  }
}
