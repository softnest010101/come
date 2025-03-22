import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { WidgetService } from '../services/widget.service';
import { CreateWidgetDto } from '../dto/create-widget.dto';
import { UpdateWidgetDto } from '../dto/update-widget.dto';

@Controller('widgets')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @Get()
  getAllWidgets() {
    return this.widgetService.getAllWidgets();
  }

  @Get(':id')
  getWidgetById(@Param('id') id: string) {
    return this.widgetService.getWidgetById(Number(id));
  }

  @Post()
  createWidget(@Body() data: CreateWidgetDto) {
    return this.widgetService.createWidget(data);
  }

  @Put(':id')
  updateWidget(@Param('id') id: string, @Body() data: UpdateWidgetDto) {
    return this.widgetService.updateWidget(Number(id), data);
  }

  @Delete(':id')
  deleteWidget(@Param('id') id: string) {
    return this.widgetService.deleteWidget(Number(id));
  }
}
