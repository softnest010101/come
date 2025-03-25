import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePageDto } from '../dto/create-page.dto';

@Injectable()
export class PageService {
  constructor(private prisma: PrismaService) {}

  async createPage(data: CreatePageDto) {
    try {
      console.log('📄 Creating Page with data:', data);
      const result = await this.prisma.page.create({
        data: {
          name: data.name,
          project: { connect: { id: data.projectId } },
        },
      });
      console.log('✅ Page created:', result);
      return result;
    } catch (error) {
      console.error('❌ Error in createPage:', error);
      throw error;
    }
  }

  async getAllPages() {
    return this.prisma.page.findMany();
  }

  async getPagesByProject(projectId: number) {
    return this.prisma.page.findMany({ where: { projectId } });
  }

  async deletePage(id: number) {
    return this.prisma.page.delete({ where: { id } });
  }
}
