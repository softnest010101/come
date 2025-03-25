import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { WidgetService } from '../services/widget.service';
import { CreateWidgetDto } from '../dto/create-widget.dto';
import { UpdateWidgetDto } from '../dto/update-widget.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Widget')
@Controller('widgets')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @Get()
  @ApiOperation({ summary: 'Get all widgets' })
  @ApiResponse({ status: 200, description: 'List of all widgets' })
  getAllWidgets() {
    return this.widgetService.getAllWidgets();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get widget by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Widget details' })
  getWidgetById(@Param('id') id: string) {
    return this.widgetService.getWidgetById(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create a widget' })
  @ApiBody({ type: CreateWidgetDto })
  @ApiResponse({ status: 201, description: 'Widget created successfully' })
  createWidget(@Body() data: CreateWidgetDto) {
    return this.widgetService.createWidget(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a widget' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateWidgetDto })
  @ApiResponse({ status: 200, description: 'Widget updated successfully' })
  updateWidget(@Param('id') id: string, @Body() data: UpdateWidgetDto) {
    return this.widgetService.updateWidget(Number(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a widget' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Widget deleted successfully' })
  deleteWidget(@Param('id') id: string) {
    return this.widgetService.deleteWidget(Number(id));
  }
}
