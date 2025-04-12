import { PartialType } from '@nestjs/mapped-types';
import { CreateWidgetInstanceDto } from './create-widget-instance.dto';

export class UpdateWidgetInstanceDto extends PartialType(CreateWidgetInstanceDto) {}
