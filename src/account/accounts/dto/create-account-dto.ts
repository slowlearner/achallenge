import {
  IsEmail,
  IsNotEmpty,
  Length,
  MinLength,
  Validate,
} from 'class-validator';
import { AccountExistsValidator } from '../validators/account-exists-validator';

export class CreateAccountDto {
  @Validate(AccountExistsValidator, {
    message: 'Account already exists',
  })
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  roles?: string[];
}
