import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
