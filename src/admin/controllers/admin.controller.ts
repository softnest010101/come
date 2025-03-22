import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AdminService } from '../services/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Post('users')
  createUser(@Body() data: { email: string; password: string; role: string }) {
    return this.adminService.createUser(data);
  }

  @Put('users/:id')
  updateUser(@Param('id') id: string, @Body() data: { email?: string; password?: string; role?: string }) {
    return this.adminService.updateUser(Number(id), data);
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(Number(id));
  }
}
