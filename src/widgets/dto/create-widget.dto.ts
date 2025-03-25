import { ApiProperty } from '@nestjs/swagger';

export class CreateWidgetDto {
  @ApiProperty({ example: 'Button' })
  name: string;

  @ApiProperty({ example: 'button' })
  type: string;

  @ApiProperty({ example: { color: 'blue', text: 'Click me' } })
  settings: object;

  @ApiProperty({ example: 1, required: false })
  projectId?: number;

  @ApiProperty({ example: 2, required: false })
  templateId?: number;
}
