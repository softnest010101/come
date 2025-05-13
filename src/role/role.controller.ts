import { Controller, Post, Get, Body, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiResponse, ApiBody } from "@nestjs/swagger";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("Role")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("roles")
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  @ApiBody({ type: CreateRoleDto })
  @ApiResponse({ status: 201, description: "Role created" })
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: "List all roles" })
  findAll() {
    return this.roleService.findAll();
  }
}
