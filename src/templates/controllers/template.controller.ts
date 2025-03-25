import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TemplateService } from '../services/template.service';
import { CreateTemplateDto } from '../dto/create-template.dto';
import { UpdateTemplateDto } from '../dto/update-template.dto';
import { ApiTags, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Template')
@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  @ApiBody({ type: CreateTemplateDto })
  @ApiResponse({ status: 201, description: 'Template successfully created' })
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templateService.create(createTemplateDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all templates' })
  findAll() {
    return this.templateService.findAll();
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Template ID' })
  @ApiBody({ type: UpdateTemplateDto })
  @ApiResponse({ status: 200, description: 'Template updated successfully' })
  update(@Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto) {
    return this.templateService.update(Number(id), updateTemplateDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Template ID' })
  @ApiResponse({ status: 200, description: 'Template deleted successfully' })
  remove(@Param('id') id: string) {
    return this.templateService.remove(Number(id));
  }
}
