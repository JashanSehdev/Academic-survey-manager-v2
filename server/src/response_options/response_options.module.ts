import { Module } from '@nestjs/common';
import { ResponseOptionsService } from './response_options.service.js';
import { ResponseOptionsController } from './response_options.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseOption } from './entities/response_option.entity.js';

@Module({
  imports : [TypeOrmModule.forFeature([ResponseOption])],
  controllers: [ResponseOptionsController],
  providers: [ResponseOptionsService],
})
export class ResponseOptionsModule {}
