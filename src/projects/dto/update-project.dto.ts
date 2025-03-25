import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiProperty({ example: 'Updated Project Name', required: false })
  name?: string;

  @ApiProperty({ example: 'Updated description for the project', required: false })
  description?: string;
}
