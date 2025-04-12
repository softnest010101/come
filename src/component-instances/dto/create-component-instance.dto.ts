import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateComponentInstanceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsObject()
  config!: Record<string, any>;

  @ApiProperty()
  @IsNumber()
  componentId!: number;

  @ApiProperty()
  @IsNumber()
  pageId!: number;
}
