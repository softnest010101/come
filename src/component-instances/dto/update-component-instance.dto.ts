import { PartialType } from '@nestjs/swagger';
import { CreateComponentInstanceDto } from './create-component-instance.dto';

export class UpdateComponentInstanceDto extends PartialType(CreateComponentInstanceDto) {}
