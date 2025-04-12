import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateComponentInstanceDto } from '../dto/create-component-instance.dto';
import { UpdateComponentInstanceDto } from '../dto/update-component-instance.dto';

// Manually define a safe type for return shape
type ComponentInstanceType = {
  id: number;
  name: string;
  config: Record<string, any>;
  componentId: number;
  pageId: number;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class ComponentInstanceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateComponentInstanceDto): Promise<ComponentInstanceType> {
    const instance = await this.prisma.componentInstance.create({
      data: {
        name: dto.name,
        config: dto.config ?? {},
        componentId: dto.componentId,
        pageId: dto.pageId,
      },
    });

    return {
      ...instance,
      config: (instance.config as Record<string, any>) ?? {},
    };
  }

  async findAll(): Promise<ComponentInstanceType[]> {
    const instances = await this.prisma.componentInstance.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return instances.map((i) => ({
      ...i,
      config: (i.config as Record<string, any>) ?? {},
    }));
  }

  async findOne(id: number): Promise<ComponentInstanceType> {
    const instance = await this.prisma.componentInstance.findUnique({
      where: { id },
    });

    if (!instance) throw new NotFoundException('ComponentInstance not found');

    return {
      ...instance,
      config: (instance.config as Record<string, any>) ?? {},
    };
  }

  async update(
    id: number,
    dto: UpdateComponentInstanceDto,
  ): Promise<ComponentInstanceType> {
    await this.findOne(id); // Ensure existence
    const updated = await this.prisma.componentInstance.update({
      where: { id },
      data: {
        name: dto.name,
        config: dto.config ?? {},
        componentId: dto.componentId,
        pageId: dto.pageId,
      },
    });

    return {
      ...updated,
      config: (updated.config as Record<string, any>) ?? {},
    };
  }

  async remove(id: number): Promise<ComponentInstanceType> {
    await this.findOne(id); // Ensure existence
    const deleted = await this.prisma.componentInstance.delete({
      where: { id },
    });

    return {
      ...deleted,
      config: (deleted.config as Record<string, any>) ?? {},
    };
  }
}
