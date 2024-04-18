import { PartialType } from '@nestjs/mapped-types';
import { CreateEntrieDto } from './create-entrie.dto';

export class UpdateEntrieDto extends PartialType(CreateEntrieDto) {}
