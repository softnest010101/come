// src/user/dto/update-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ required: false, description: 'User\'s first name' })
  firstName?: string;

  @ApiProperty({ required: false, description: 'User\'s last name' })
  lastName?: string;

  @ApiProperty({ required: false, description: 'URL to user\'s avatar image' })
  avatarUrl?: string;

  @ApiProperty({ required: false, description: 'Role ID assigned to user' })
  roleId?: number;
}
