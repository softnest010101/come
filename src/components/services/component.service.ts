import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateComponentDto } from '../dto/create-component.dto';

@Injectable()
export class ComponentService {
  constructor(private prisma: PrismaService) {}

  async createComponent(data: CreateComponentDto) {
    return this.prisma.component.create({
      data: {
        name: data.name,
        type: data.type,
        page: { connect: { id: data.pageId } },
      },
    });
  }

  async getComponentsByPage(pageId: number) {
    return this.prisma.component.findMany({ where: { pageId } });
  }

  async deleteComponent(id: number) {
    return this.prisma.component.delete({ where: { id } });
  }
}
