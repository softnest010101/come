import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ComponentService } from './component.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { Request } from 'express';

interface User {
  id: number; // ✅ ვასწორებთ userId → id
  email: string;
  role: string;
}

interface AuthenticatedRequest extends Request {
  user: User;
}

@ApiTags('Component')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('components')
export class ComponentController {
  constructor(private readonly service: ComponentService) {}

  @Post()
  @ApiBody({ type: CreateComponentDto })
  @ApiResponse({ status: 201, description: 'Component created' })
  create(@Req() req: AuthenticatedRequest, @Body() dto: CreateComponentDto) {
    const userId = req.user?.id; // ✅ ვასწორებთ აქაც
    return this.service.create(userId, dto);
  }

  @Get('by-page/:pageId')
  @ApiParam({ name: 'pageId', type: Number })
  findByPage(
    @Req() req: AuthenticatedRequest,
    @Param('pageId', ParseIntPipe) pageId: number,
  ) {
    const userId = req.user?.id;
    return this.service.findByPage(pageId, userId);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  findOne(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = req.user?.id;
    return this.service.findOne(id, userId);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateComponentDto })
  update(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateComponentDto,
  ) {
    const userId = req.user?.id;
    return this.service.update(id, userId, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  remove(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = req.user?.id;
    return this.service.remove(id, userId);
  }
}
