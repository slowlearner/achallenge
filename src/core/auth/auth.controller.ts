import { Body, Controller, Post } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { AuthService } from './auth.service';
import { SUCESS_OR_FAIL } from '../common/interfaces';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import {
  PasswordResetDto,
  PasswordResetResponseDto,
} from './dto/password-reset.dto';
import { PasswordResetRequestDto } from './dto/password-reset-request.dto';

@ApiTags('Auth')
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
  @Post('/password-reset-request')
  async passwordReset(
    @Body() request: PasswordResetRequestDto,
  ): Promise<PasswordResetResponseDto> {
    try {
      await this.accountService.createPasswordResetRequest(request.email);
      return {
        status: SUCESS_OR_FAIL.SUCCESS,
      };
    } catch (e) {
      console.log('e', e);
      return {
        status: SUCESS_OR_FAIL.FAIL,
      };
    }
  }

  @Post('/password-reset')
  async passwordResetRequest(
    @Body() request: PasswordResetDto,
  ): Promise<PasswordResetResponseDto> {
    try {
      await this.accountService.updatePassword(request.token, request.password);
      return {
        status: SUCESS_OR_FAIL.SUCCESS,
      };
    } catch (e) {
      console.log('e', e);
      return {
        status: SUCESS_OR_FAIL.FAIL,
      };
    }
  }
}
