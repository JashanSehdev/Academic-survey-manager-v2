import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/register-user.dto.js';
import { LoginAdminDto, LoginStudentDto, LoginUserDto } from './dto/login-user-dto.js';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { AuthPayload } from './interface/auth-payload.interface.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userServices: UsersService,
    private readonly jwtServices: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    const existedUser = await this.userServices.findUserByEmail(registerDto.email);

    if (existedUser) {
      throw new ConflictException('User already exist')
    }
    const user = await this.userServices.createUser(registerDto);
    const payload : AuthPayload = {
      userId: user.id,
      username: user.username,
      email: user.email,
      card_id: user.card_id,
      role: user.role,
    };

    return {access_token :  this.jwtServices.sign(payload)};
  }


  async loginAdmin (loginAdminDto : LoginAdminDto) {
    const {email, password} = loginAdminDto
    const existedUser = await this.userServices.findUserByEmail(email);
    if (!existedUser) {
      throw new BadRequestException('Email or Password is incorrect')
    }

    const {hashed_password} = existedUser
    const isValid = await bcrypt.compare(password, hashed_password);

    if(!isValid) throw new BadRequestException('Email or password is incorrent')


    const payload : AuthPayload =  {
      userId: existedUser.id,
      username: existedUser.username,
      email: existedUser.email,
      card_id: existedUser.card_id,
      role: existedUser.role,
    }

    return { access_token : this.jwtServices.sign(payload) }
  }

  async loginStudent (loginAdminDto : LoginStudentDto) {
    const {email, card_id} = loginAdminDto
    const existedUser = await this.userServices.findByCardIdAndEmail(+card_id, email);
    if (!existedUser) {
      throw new BadRequestException('Email or Card_id is incorrect')
    }

    const payload : AuthPayload =  {
      userId: existedUser.id,
      username: existedUser.username,
      email: existedUser.email,
      card_id: existedUser.card_id,
      role: existedUser.role,
    }

    return { access_token : this.jwtServices.sign(payload) }
  }

  async getMe(userId : string) {
    const user = await this.userServices.getUserById(userId);
    
    if (!user) throw new NotFoundException('user not found');

    return user
  }
}
