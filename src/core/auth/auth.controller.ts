import { Body, Controller, Post } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly accountService: AccountsService,
    private readonly authService: AuthService,
  ) {}
  @Post('/login')
  async login(@Body() credentials: LoginDto): Promise<LoginResponseDto> {
    const account = await this.authService.validateUser(
      credentials.email,
      credentials.password,
    );

    if (!account) {
      return null;
    }
    const response: LoginResponseDto = {
      token: await this.authService.generateToken(account),
    };
    return response;
  }
}
