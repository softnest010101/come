import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  // 📌 ყველა პროექტის მიღება (Admin-სთვის)
  async getAllProjects() {
    return this.prisma.project.findMany({
      include: { owner: true, templates: true },
    });
  }

  // 📌 მომხმარებლის პროექტების მიღება
  async getUserProjects(userId: number) {
    return this.prisma.project.findMany({
      where: { ownerId: userId },
      include: { templates: true },
    });
  }

  // 📌 ერთი პროექტის მიღება (მხოლოდ მფლობელისთვის)
  async getProjectById(id: number, userId: number, isAdmin: boolean) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { templates: true },
    });

    if (!project) throw new Error('Project not found');

    if (!isAdmin && project.ownerId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return project;
  }

  // 📌 ახალი პროექტის შექმნა
  async createProject(data: CreateProjectDto, userId: number) {
    return this.prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        ownerId: userId,
      },
    });
  }

  // 📌 პროექტის განახლება (მხოლოდ მფლობელისთვის)
  async updateProject(id: number, data: UpdateProjectDto, userId: number, isAdmin: boolean) {
    const project = await this.getProjectById(id, userId, isAdmin);

    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  // 📌 პროექტის წაშლა (მხოლოდ მფლობელისთვის)
  async deleteProject(id: number, userId: number, isAdmin: boolean) {
    await this.getProjectById(id, userId, isAdmin);

    return this.prisma.project.delete({
      where: { id },
    });
  }
}
