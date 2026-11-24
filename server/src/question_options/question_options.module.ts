import { Module } from '@nestjs/common';
import { QuestionOptionsService } from './question_options.service.js';
import { QuestionOptionsController } from './question_options.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionOption } from './entities/question_option.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionOption])],
  controllers: [QuestionOptionsController],
  providers: [QuestionOptionsService],
})
export class QuestionOptionsModule {}
