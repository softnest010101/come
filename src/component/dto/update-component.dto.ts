import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsObject } from 'class-validator';

export class UpdateComponentDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  type!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  config!: Record<string, any>;
}
