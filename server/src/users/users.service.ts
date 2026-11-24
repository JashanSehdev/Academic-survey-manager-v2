import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { UserRole } from './enum/user-role.enum.js';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { BaseService } from '../common/services/base.service.js';

@Injectable()
export class UsersService extends BaseService<User> {

  constructor(
    @InjectRepository(User)
    private readonly userRepsository : Repository<User>
  ){
    super(userRepsository)
  }
  async createUser(createUserDto: CreateUserDto) {
    const hashed_password = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepsository.create({...createUserDto, hashed_password, role : UserRole.ADMIN});

    return await this.userRepsository.save(user);

  }

  
}
