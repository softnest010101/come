import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TemplateService {
  constructor(private prisma: PrismaService) {}

  // 📌 ყველა შაბლონის მიღება მონაცემთა ბაზიდან
  async getAllTemplates(userId: number) {
    return this.prisma.template.findMany({
      where: { project: { ownerId: userId } },
    });
  }

  // 📌 ახალი შაბლონის შექმნა
  async createTemplate(data: { name: string; description?: string; projectId: number }, userId: number) {
    const project = await this.prisma.project.findUnique({
      where: { id: data.projectId },
    });

    if (!project || project.ownerId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.template.create({ data });
  }

  // 📌 შაბლონის განახლება
  async updateTemplate(id: number, data: { name?: string; description?: string }, userId: number) {
    const template = await this.prisma.template.findUnique({
      where: { id },
      include: { project: true },
    });

    if (!template || template.project.ownerId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.template.update({
      where: { id },
      data,
    });
  }

  // 📌 შაბლონის წაშლა
  async deleteTemplate(id: number, userId: number) {
    const template = await this.prisma.template.findUnique({
      where: { id },
      include: { project: true },
    });

    if (!template || template.project.ownerId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.template.delete({ where: { id } });
  }
}
