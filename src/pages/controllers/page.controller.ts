import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { PageService } from '../services/page.service';
import { CreatePageDto } from '../dto/create-page.dto';

@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  createPage(@Body() data: CreatePageDto) {
    return this.pageService.createPage(data);
  }

  @Get()
  getAllPages() {
    return this.pageService.getAllPages(); // ✅ ყველა გვერდის მიღება
  }

  @Get(':projectId')
  getPages(@Param('projectId') projectId: string) {
    return this.pageService.getPagesByProject(Number(projectId));
  }

  @Delete(':id')
  deletePage(@Param('id') id: string) {
    return this.pageService.deletePage(Number(id));
  }
}
