import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { PageService } from '../services/page.service';
import { CreatePageDto } from '../dto/create-page.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Page')
@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new page' })
  @ApiResponse({ status: 201, description: 'Page created successfully' })
  @ApiBody({ type: CreatePageDto })
  createPage(@Body() data: CreatePageDto) {
    return this.pageService.createPage(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pages' })
  @ApiResponse({ status: 200, description: 'List of all pages' })
  getAllPages() {
    return this.pageService.getAllPages();
  }

  @Get(':projectId')
  @ApiOperation({ summary: 'Get pages by project ID' })
  @ApiParam({ name: 'projectId', type: Number })
  @ApiResponse({ status: 200, description: 'List of pages for a project' })
  getPages(@Param('projectId') projectId: string) {
    return this.pageService.getPagesByProject(Number(projectId));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a page by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Page deleted successfully' })
  deletePage(@Param('id') id: string) {
    return this.pageService.deletePage(Number(id));
  }
}
