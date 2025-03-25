import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateComponentDto } from '../dto/create-component.dto';

@Injectable()
export class ComponentService {
  constructor(private prisma: PrismaService) {}

  async createComponent(data: CreateComponentDto) {
    try {
      console.log('🧩 Creating Component with data:', data);
      const result = await this.prisma.component.create({
        data: {
          name: data.name,
          type: data.type,
          page: { connect: { id: data.pageId } },
        },
      });
      console.log('✅ Component created:', result);
      return result;
    } catch (error) {
      console.error('❌ Error in createComponent:', error);
      throw error;
    }
  }

  async getComponentsByPage(pageId: number) {
    return this.prisma.component.findMany({ where: { pageId } });
  }

  async deleteComponent(id: number) {
    return this.prisma.component.delete({ where: { id } });
  }
}
