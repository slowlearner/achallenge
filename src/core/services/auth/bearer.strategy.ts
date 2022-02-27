import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(key: string): Promise<any> {
    const user = await this.authService.validateKey(key);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
