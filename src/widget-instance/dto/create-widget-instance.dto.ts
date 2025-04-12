import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateWidgetInstanceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  config!: Record<string, any>;

  @ApiProperty()
  @IsNumber()
  widgetId!: number;

  @ApiProperty()
  @IsNumber()
  pageId!: number;
}
