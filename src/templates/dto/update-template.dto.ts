import { ApiProperty } from '@nestjs/swagger';

export class UpdateTemplateDto {
  @ApiProperty({ example: 'Updated Template Name', required: false })
  name?: string;

  @ApiProperty({ example: 'Updated description', required: false })
  description?: string;
}
