import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { TemplateService } from '../services/template.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string; role: string };
}

@Controller('templates')
@UseGuards(AuthGuard)
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  getAllTemplates(@Req() req: AuthenticatedRequest) {
    return this.templateService.getAllTemplates(req.user!.id);
  }

  @Post()
  createTemplate(@Body() data: { name: string; description?: string; projectId: number }, @Req() req: AuthenticatedRequest) {
    return this.templateService.createTemplate(data, req.user!.id);
  }

  @Put(':id')
  updateTemplate(@Param('id') id: string, @Body() data: { name?: string; description?: string }, @Req() req: AuthenticatedRequest) {
    return this.templateService.updateTemplate(Number(id), data, req.user!.id);
  }

  @Delete(':id')
  deleteTemplate(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.templateService.deleteTemplate(Number(id), req.user!.id);
  }
}
