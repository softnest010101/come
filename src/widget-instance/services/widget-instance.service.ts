import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWidgetInstanceDto } from '../dto/create-widget-instance.dto';
import { UpdateWidgetInstanceDto } from '../dto/update-widget-instance.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class WidgetInstanceService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateWidgetInstanceDto) {
    return this.prisma.widgetInstance.create({ data });
  }

  findAll() {
    return this.prisma.widgetInstance.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const instance = await this.prisma.widgetInstance.findUnique({
      where: { id },
    });
    if (!instance) throw new NotFoundException('WidgetInstance not found');
    return instance;
  }

  async update(id: number, data: UpdateWidgetInstanceDto) {
    await this.findOne(id);
    return this.prisma.widgetInstance.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.widgetInstance.delete({ where: { id } });
  }

  /**
   * Duplicate all widget instances from originalPageId to newPageId
   */
  async duplicateByPage(originalPageId: number, newPageId: number) {
    const instances = await this.prisma.widgetInstance.findMany({
      where: { pageId: originalPageId },
    });

    for (const instance of instances) {
      await this.prisma.widgetInstance.create({
        data: {
          name: instance.name,
          config: instance.config ?? Prisma.JsonNull, // ✅ Added fallback for null config
          widgetId: instance.widgetId,
          pageId: newPageId,
        },
      });
    }
  }
}
