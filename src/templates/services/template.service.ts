import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTemplateDto } from '../dto/create-template.dto';
import { UpdateTemplateDto } from '../dto/update-template.dto';

@Injectable()
export class TemplateService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTemplateDto) {
    return this.prisma.template.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.template.findMany({
      include: { project: true },
    });
  }

  async update(id: number, data: UpdateTemplateDto) {
    return this.prisma.template.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.template.delete({
      where: { id },
    });
  }
}
