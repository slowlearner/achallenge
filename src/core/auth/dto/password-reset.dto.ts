import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, Validate } from 'class-validator';
import { PasswordValidation } from 'class-validator-password-check/lib';
import { SUCESS_OR_FAIL } from 'src/core/common/interfaces';
import { PASSWORD_RESET_REQUIREMENT } from 'src/core/constants';

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
