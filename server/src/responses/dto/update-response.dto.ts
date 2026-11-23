import { PartialType } from '@nestjs/mapped-types';
import { CreateResponseDto } from './create-response.dto.js';

export class UpdateResponseDto extends PartialType(CreateResponseDto) {}
