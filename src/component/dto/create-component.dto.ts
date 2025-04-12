import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsObject } from 'class-validator';

export class CreateComponentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type!: string;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  config!: Record<string, any>;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  pageId!: number;
}
