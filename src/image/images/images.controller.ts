import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RBAcGuard, RBAcPermissions } from 'nestjs-rbac';

@Controller('images')
export class ImagesController {
  @RBAcPermissions('images@list')
  @UseGuards(AuthGuard('jwt'), RBAcGuard)
  @Get()
  list(@Req() req: any) {
    console.log(req.user);
    return '';
  }
}
