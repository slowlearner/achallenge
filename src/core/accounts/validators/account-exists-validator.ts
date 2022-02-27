import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts.service';

@ValidatorConstraint({ name: 'AccountExists', async: true })
@Injectable()
export class AccountExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly service: AccountsService) {}

  async validate(text: string) {
    const account = await this.service.findByEmail(text);

    if (account) {
      return false;
    }

    return true;
  }
}
