import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WidgetInstanceService } from '../services/widget-instance.service';
import { CreateWidgetInstanceDto } from '../dto/create-widget-instance.dto';
import { UpdateWidgetInstanceDto } from '../dto/update-widget-instance.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('WidgetInstances')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('widget-instances')
export class WidgetInstanceController {
  constructor(private readonly widgetInstanceService: WidgetInstanceService) {}

  @Post()
  @Roles('admin') // Adjust as needed
  create(@Body() dto: CreateWidgetInstanceDto) {
    return this.widgetInstanceService.create(dto);
  }

  @Get()
  findAll() {
    return this.widgetInstanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.widgetInstanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWidgetInstanceDto) {
    return this.widgetInstanceService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.widgetInstanceService.remove(+id);
  }
}
