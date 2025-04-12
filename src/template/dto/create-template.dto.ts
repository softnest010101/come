import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateTemplateDto {
  @ApiProperty({
    description: 'Template name (required)',
    example: 'Landing Page Template',
  })
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    description: 'Optional description of the template',
    example: 'A basic layout for landing pages with hero and contact sections.',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
