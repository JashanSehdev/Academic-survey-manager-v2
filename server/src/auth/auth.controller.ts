import {
  Controller,
  Get,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register-user.dto.js';
import type { Response } from 'express';
import { HttpAdapterHost } from '@nestjs/core';
import { LoginAdminDto, LoginStudentDto, LoginUserDto } from './dto/login-user-dto.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adapterHost: HttpAdapterHost,
  ) {}

  @Post('register')
  async create(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.register(registerDto);

    this.adapterHost.httpAdapter.setCookie(res, 'access_token', access_token, {
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    });

    return {
      message: 'registration successful',
    };
  }

  @Post('login/admin')
  async adminLogin(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.loginAdmin(loginAdminDto);

    this.adapterHost.httpAdapter.setCookie(res, 'access_token', access_token, {
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    });

    return {
      message : 'admin login successful'
    }
  }

  @Post('login/student') 
  async studentLogin (
    @Body() loginStudentDto: LoginStudentDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const {access_token} = await this.authService.loginStudent(loginStudentDto);

    this.adapterHost.httpAdapter.setCookie(res, 'access_token', access_token, {
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    });

    return {
      message : 'student login successful'
    }
  }

  @Get('me')
  getCurrentUser (@CurrentUser('userId') userId : string) {
    return this.authService.getMe(userId)
  }
}
