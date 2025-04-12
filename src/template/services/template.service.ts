import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateTemplateDto } from '../dto/create-template.dto';
import { UpdateTemplateDto } from '../dto/update-template.dto';
import { WidgetInstanceService } from 'src/widget-instance/services/widget-instance.service';

@Injectable()
export class TemplateService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly widgetInstanceService: WidgetInstanceService,
  ) {}

  create(data: CreateTemplateDto & { ownerId: number }) {
    return this.prisma.template.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        owner: { connect: { id: data.ownerId } },
      },
    });
  }

  findAll() {
    return this.prisma.template.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: number) {
    const template = await this.prisma.template.findUnique({ where: { id } });
    if (!template) throw new NotFoundException('Template not found');
    return template;
  }

  async update(id: number, dto: UpdateTemplateDto) {
    await this.findOne(id);
    return this.prisma.template.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.template.delete({ where: { id } });
  }

  async duplicate(templateId: number, userId: number) {
    const template = await this.prisma.template.findUnique({
      where: { id: templateId },
      include: {
        pages: {
          include: {
            components: true,
            widgetInstances: true,
          },
        },
      },
    });

    if (!template) throw new NotFoundException('Template not found');

    const newProject = await this.prisma.project.create({
      data: {
        name: `${template.name} - Copy`,
        description: template.description || '',
        owner: { connect: { id: userId } },
      },
    });

    for (const page of template.pages) {
      const newPage = await this.prisma.page.create({
        data: {
          name: page.name,
          description: page.description,
          projectId: newProject.id,
        },
      });

      // Duplicate components
      for (const component of page.components) {
        await this.prisma.component.create({
          data: {
            name: component.name,
            type: component.type,
            config: component.config ?? Prisma.JsonNull,
            pageId: newPage.id,
          },
        });
      }

      // ✅ Use shared method to duplicate widgetInstances
      await this.widgetInstanceService.duplicateByPage(page.id, newPage.id);
    }

    return newProject;
  }

  async useTemplate(templateId: number, userId: number) {
    const template = await this.prisma.template.findUnique({
      where: { id: templateId },
      include: {
        pages: {
          include: {
            components: true,
            widgetInstances: true,
          },
        },
      },
    });

    if (!template) throw new NotFoundException('Template not found');

    const newProject = await this.prisma.project.create({
      data: {
        name: `${template.name} Project`,
        description: template.description || '',
        owner: { connect: { id: userId } },
      },
    });

    for (const page of template.pages) {
      const newPage = await this.prisma.page.create({
        data: {
          name: page.name,
          description: page.description,
          projectId: newProject.id,
          templateId: template.id,
        },
      });

      // Duplicate components
      for (const component of page.components) {
        await this.prisma.component.create({
          data: {
            name: component.name,
            type: component.type,
            config: component.config ?? Prisma.JsonNull,
            pageId: newPage.id,
          },
        });
      }

      // ✅ Use shared method to duplicate widgetInstances
      await this.widgetInstanceService.duplicateByPage(page.id, newPage.id);
    }

    return newProject;
  }
}
