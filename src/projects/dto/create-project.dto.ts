import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'CRM App', description: 'Project name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Customer Relationship Management tool', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1, description: 'Owner user ID' })
  @IsNotEmpty()
  @IsInt()
  ownerId: number;
}
