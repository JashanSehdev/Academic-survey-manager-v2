import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service.js';
import { AnswersController } from './answers.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
