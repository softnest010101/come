import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.updateUser(Number(id), data);
  }
}
