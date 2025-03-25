import { ApiProperty } from '@nestjs/swagger';

export class CreateTemplateDto {
  @ApiProperty({ example: 'Landing Page', description: 'Template name' })
  name: string;

  @ApiProperty({ example: 'Template for modern landing pages', required: false })
  description?: string;

  @ApiProperty({ example: 1, description: 'ID of the related project' })
  projectId: number;
}
