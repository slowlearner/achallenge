import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('test')
export class TestController {
  @UseGuards(AuthGuard('bearer'))
  @Get()
  list() {
    return {};
  }
}
