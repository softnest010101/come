import { ApiProperty } from '@nestjs/swagger';

export class CreatePageDto {
  @ApiProperty({ example: 'Main Landing Page' })
  name: string;

  @ApiProperty({ example: 1 })
  projectId: number;
}
