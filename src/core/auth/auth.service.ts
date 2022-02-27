import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/core/accounts/accounts.service';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/core/constants';
import { Account } from 'src/core/accounts/models/account.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountsService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const account = await this.accountService.findByEmail(email);
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    if (account) {
      if (bcrypt.compare(account.password, hash)) {
        return account;
      }
    }
    return null;
  }
  async generateToken(account: Account) {
    return await this.jwtService.sign(account);
  }
}
