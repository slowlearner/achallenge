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
import { AccountExistsValidator } from '../validators/account-exists-validator';

const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};

export class CreateAccountDto {
  @Validate(AccountExistsValidator, {
    message: 'Account already exists',
  })
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @MinLength(8)
  @Validate(PasswordValidation, [passwordRequirement])
  @ApiProperty()
  password: string;
  roles?: string[];
}
