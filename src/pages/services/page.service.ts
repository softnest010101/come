import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePageDto } from '../dto/create-page.dto';

@Injectable()
export class PageService {
  constructor(private prisma: PrismaService) {}

  async createPage(data: CreatePageDto) {
    return this.prisma.page.create({
      data: {
        name: data.name,
        project: { connect: { id: data.projectId } },
      },
    });
  }

  async getAllPages() {
    return this.prisma.page.findMany(); // ✅ ყველა გვერდის დაბრუნება
  }

  async getPagesByProject(projectId: number) {
    return this.prisma.page.findMany({ where: { projectId } });
  }

  async deletePage(id: number) {
    return this.prisma.page.delete({ where: { id } });
  }
}
