import { Injectable } from '@nestjs/common';
import { User } from '../users/models/user.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  validateKey(key: string): User {
    const user = this.usersService.getByApiKey(key);
    return user;
  }
}
