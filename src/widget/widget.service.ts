import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';

@Injectable()
export class WidgetService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateWidgetDto) {
    return this.prisma.widget.create({ data: dto });
  }

  findAll() {
    return this.prisma.widget.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: number) {
    const widget = await this.prisma.widget.findUnique({ where: { id } });
    if (!widget) throw new NotFoundException('Widget not found');
    return widget;
  }

  async update(id: number, dto: UpdateWidgetDto) {
    await this.findOne(id);
    return this.prisma.widget.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.widget.delete({ where: { id } });
  }
}
