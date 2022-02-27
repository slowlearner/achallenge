import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('images')
export class ImagesController {
  @UseGuards(AuthGuard('bearer'))
  @Get()
  list() {
    return '';
  }
}
