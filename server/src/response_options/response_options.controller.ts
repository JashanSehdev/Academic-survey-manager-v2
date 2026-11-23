import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResponseOptionsService } from './response_options.service.js';
import { CreateResponseOptionDto } from './dto/create-response_option.dto.js';
import { UpdateResponseOptionDto } from './dto/update-response_option.dto.js';

@Controller('response-options')
export class ResponseOptionsController {
  constructor(private readonly responseOptionsService: ResponseOptionsService) {}

  @Post()
  create(@Body() createResponseOptionDto: CreateResponseOptionDto) {
    return this.responseOptionsService.create(createResponseOptionDto);
  }

  @Get()
  findAll() {
    return this.responseOptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.responseOptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResponseOptionDto: UpdateResponseOptionDto) {
    return this.responseOptionsService.update(+id, updateResponseOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.responseOptionsService.remove(+id);
  }
}
