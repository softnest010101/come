import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWidgetDto } from '../dto/create-widget.dto';
import { UpdateWidgetDto } from '../dto/update-widget.dto';

@Injectable()
export class WidgetService {
  constructor(private prisma: PrismaService) {}

  // ✅ ყველა ვიჯეტის მიღება
  async getAllWidgets() {
    return this.prisma.widget.findMany();
  }

  // ✅ ვიჯეტის ID-ით მიღება
  async getWidgetById(id: number) {
    return this.prisma.widget.findUnique({ where: { id } });
  }

  // ✅ ახალი ვიჯეტის შექმნა
  async createWidget(data: CreateWidgetDto) {
    return this.prisma.widget.create({ data });
  }

  // ✅ არსებული ვიჯეტის განახლება
  async updateWidget(id: number, data: UpdateWidgetDto) {
    return this.prisma.widget.update({ where: { id }, data });
  }

  // ✅ ვიჯეტის წაშლა
  async deleteWidget(id: number) {
    return this.prisma.widget.delete({ where: { id } });
  }
}
