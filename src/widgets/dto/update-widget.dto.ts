import { ApiProperty } from '@nestjs/swagger';

export class UpdateWidgetDto {
  @ApiProperty({ example: 'Input Field', required: false })
  name?: string;

  @ApiProperty({ example: 'input', required: false })
  type?: string;

  @ApiProperty({ example: { placeholder: 'Enter name' }, required: false })
  settings?: object;
}
