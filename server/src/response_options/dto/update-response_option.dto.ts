import { PartialType } from '@nestjs/mapped-types';
import { CreateResponseOptionDto } from './create-response_option.dto.js';

export class UpdateResponseOptionDto extends PartialType(CreateResponseOptionDto) {}
