import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ComponentService } from '../services/component.service';
import { CreateComponentDto } from '../dto/create-component.dto';

@Controller('components')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}

  @Post()
  createComponent(@Body() data: CreateComponentDto) {
    return this.componentService.createComponent(data);
  }

  @Get(':pageId')
  getComponents(@Param('pageId') pageId: string) {
    return this.componentService.getComponentsByPage(Number(pageId));
  }

  @Delete(':id')
  deleteComponent(@Param('id') id: string) {
    return this.componentService.deleteComponent(Number(id));
  }
}
