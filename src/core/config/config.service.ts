import { Injectable } from '@nestjs/common';
import { JWT_SECRET } from '../constants';

@Injectable()
export class ConfigService {
  expiresIn = '60s';
  jwtSecret = JWT_SECRET;
}
