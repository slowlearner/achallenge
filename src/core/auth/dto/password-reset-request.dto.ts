import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PasswordResetRequestDto {
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
