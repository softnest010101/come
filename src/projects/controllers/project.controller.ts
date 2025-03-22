import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { Request } from 'express';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { CreateProjectDto } from '../dto/create-project.dto';

interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string; role: string };
}

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getUserProjects(@Req() req: AuthenticatedRequest) {
    return this.projectService.getUserProjects(req.user!.id);
  }

  @Get(':id')
  getProjectById(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.projectService.getProjectById(Number(id), req.user!.id, req.user!.role === 'admin');
  }

  @Post()
  createProject(@Body() data: CreateProjectDto, @Req() req: AuthenticatedRequest) {
    return this.projectService.createProject(data, req.user!.id);
  }

  @Put(':id')
  updateProject(@Param('id') id: string, @Body() data: UpdateProjectDto, @Req() req: AuthenticatedRequest) {
    return this.projectService.updateProject(Number(id), data, req.user!.id, req.user!.role === 'admin');
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.projectService.deleteProject(Number(id), req.user!.id, req.user!.role === 'admin');
  }
}
