import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userServices: UsersService,
    private readonly jwtServices: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    const user = await this.userServices.createUser(registerDto);
    const payload_data = {
      id: user.id,
      username: user.username,
      email: user.email,
      card_id: user.card_id,
      role: user.role,
    };

    return {access_token :  this.jwtServices.sign(payload_data)};
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
