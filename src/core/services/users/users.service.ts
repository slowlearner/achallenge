import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  users: User[] = [
    {
      name: 'Erwin Atuli',
      apiKey: 'xxxyyy',
    },
  ];
  getByApiKey(key: string): User {
    const u = this.users.filter((s) => {
      return s.apiKey === key;
    });

    if (u.length > 0) {
      return u[0];
    }
    return null;
  }
}
