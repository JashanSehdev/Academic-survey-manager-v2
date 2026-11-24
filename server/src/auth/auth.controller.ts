import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../users/enum/user-role.enum.js';
import type { Response } from 'express';
import { HttpAdapterHost } from '@nestjs/core';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adapterHost: HttpAdapterHost
    
  ) {}

  @Post('register')
  async create(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) res: Response ) {
    const {access_token} =  await this.authService.register(registerDto);

    this.adapterHost.httpAdapter.setCookie(res, 'access_token', access_token, {
      sameSite : 'lax',
      maxAge : 60*60*24*365
    })

    return {
      message : 'registration successful'
    }

    

  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
