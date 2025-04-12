import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, dto: CreateProjectDto) {
    return await this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        ownerId: userId,
      },
    });
  }

  async findMyProjects(userId: number) {
    return await this.prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, userId: number) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) throw new NotFoundException('Project not found');
    if (project.ownerId !== userId)
      throw new ForbiddenException('Access denied');

    return project;
  }

  async update(id: number, userId: number, dto: UpdateProjectDto) {
    const project = await this.findOne(id, userId);

    return await this.prisma.project.update({
      where: { id: project.id },
      data: {
        name: dto.name ?? project.name,
        description: dto.description ?? project.description,
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: number, userId: number) {
    const project = await this.findOne(id, userId);
    return await this.prisma.project.delete({
      where: { id: project.id },
    });
  }
}
