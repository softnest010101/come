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
import { PageService } from './page.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Request } from 'express';

@ApiTags('Page')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new page' })
  @ApiBody({ type: CreatePageDto })
  @ApiResponse({ status: 201, description: 'Page created' })
  create(@Req() req: Request, @Body() dto: CreatePageDto) {
    const userId = req.user?.id;
    return this.pageService.create(userId!, dto);
  }

  @Get('my')
  @ApiOperation({ summary: 'Get pages owned by authenticated user' })
  @ApiResponse({ status: 200, description: 'My pages list' })
  findMine(@Req() req: Request) {
    const userId = req.user?.id;
    return this.pageService.findMyPages(userId!);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one page by ID (with ownership check)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Page returned' })
  findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user?.id;
    return this.pageService.findOne(id, userId!);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a page' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdatePageDto })
  @ApiResponse({ status: 200, description: 'Page updated' })
  update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePageDto,
  ) {
    const userId = req.user?.id;
    return this.pageService.update(id, userId!, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a page' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Page deleted' })
  remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user?.id;
    return this.pageService.remove(id, userId!);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: 'Duplicate a page with components and widgets' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 201, description: 'Page duplicated successfully' })
  duplicatePage(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user?.id;
    return this.pageService.duplicate(id, userId!);
  }
}
