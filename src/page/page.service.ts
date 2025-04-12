import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, dto: CreatePageDto) {
    const project = await this.prisma.project.findUnique({
      where: { id: dto.projectId },
    });

    if (!project) throw new NotFoundException('Project not found');
    if (project.ownerId !== userId) throw new ForbiddenException('Access denied');

    return await this.prisma.page.create({
      data: {
        name: dto.name,
        description: dto.description,
        projectId: dto.projectId,
        templateId: dto.templateId ?? null,
      },
    });
  }

  async findMyPages(userId: number) {
    return await this.prisma.page.findMany({
      where: {
        project: {
          ownerId: userId,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, userId: number) {
    const page = await this.prisma.page.findUnique({
      where: { id },
      include: { project: true },
    });
    if (!page) throw new NotFoundException('Page not found');
    if (page.project.ownerId !== userId) throw new ForbiddenException('Access denied');
    return page;
  }

  async update(id: number, userId: number, dto: UpdatePageDto) {
    const page = await this.findOne(id, userId);
    return await this.prisma.page.update({
      where: { id: page.id },
      data: {
        name: dto.name ?? page.name,
        description: dto.description ?? page.description,
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: number, userId: number) {
    const page = await this.findOne(id, userId);
    return await this.prisma.page.delete({
      where: { id: page.id },
    });
  }

  async duplicate(id: number, userId: number) {
    const originalPage = await this.prisma.page.findUnique({
      where: { id },
      include: {
        project: true,
        components: true,
        widgetInstances: true,
      },
    });

    if (!originalPage) throw new NotFoundException('Page not found');
    if (originalPage.project.ownerId !== userId)
      throw new ForbiddenException('Access denied');

    const newPage = await this.prisma.page.create({
      data: {
        name: `${originalPage.name} Copy`,
        description: originalPage.description,
        projectId: originalPage.projectId,
        templateId: originalPage.templateId ?? null,
      },
    });

    await Promise.all([
      ...originalPage.components.map((component) =>
        this.prisma.component.create({
          data: {
            name: component.name,
            type: component.type,
            config: component.config ?? Prisma.JsonNull,
            pageId: newPage.id,
          },
        }),
      ),
      ...originalPage.widgetInstances.map((instance) =>
        this.prisma.widgetInstance.create({
          data: {
            name: instance.name,
            config: instance.config ?? Prisma.JsonNull,
            widgetId: instance.widgetId,
            pageId: newPage.id,
          },
        }),
      ),
    ]);

    return newPage;
  }
}
