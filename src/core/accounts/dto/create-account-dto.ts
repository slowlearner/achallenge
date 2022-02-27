import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Length,
  MinLength,
  Validate,
} from 'class-validator';
import {
  PasswordValidation,
  PasswordValidationRequirement,
} from 'class-validator-password-check/lib';
import { PASSWORD_RESET_REQUIREMENT } from 'src/core/constants';
import { AccountExistsValidator } from '../validators/account-exists-validator';

export class CreateAccountDto {
  @Validate(AccountExistsValidator, {
    message: 'Account already exists',
  })
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @MinLength(8)
  @Validate(PasswordValidation, [PASSWORD_RESET_REQUIREMENT])
  @ApiProperty()
  password: string;
  role?: string;
}
