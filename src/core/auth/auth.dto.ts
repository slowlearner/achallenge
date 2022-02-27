import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, Validate } from 'class-validator';
import { PasswordValidation } from 'class-validator-password-check/lib';
import { SUCESS_OR_FAIL } from '../common.interface';
import { PASSWORD_RESET_REQUIREMENT } from '../constants';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty()
  token: string;
}

export class PasswordResetRequestDto {
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}

export class PasswordResetDto {
  @IsNotEmpty()
  @ApiProperty()
  token: string;
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @Validate(PasswordValidation, [PASSWORD_RESET_REQUIREMENT])
  password: string;
}

export class PasswordResetResponseDto {
  @ApiProperty()
  status: SUCESS_OR_FAIL;
}
