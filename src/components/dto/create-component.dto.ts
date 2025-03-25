import { ApiProperty } from '@nestjs/swagger';

export class CreateComponentDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  pageId: number;
}
