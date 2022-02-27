import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { AuthService } from './auth.service';
import {
  LoginDto,
  LoginResponseDto,
  PasswordResetDto,
  PasswordResetRequestDto,
  PasswordResetResponseDto,
} from './auth.dto';
import { SUCESS_OR_FAIL } from '../common.interface';

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
