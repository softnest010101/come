import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import {
  RelationshipService,
  SupportedModel,
} from "../shared/relationship.service";

@Injectable()
export class ProjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly relationshipService: RelationshipService,
  ) {}

  async create(userId: number, dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        ownerId: userId,
      },
    });
  }

  async findMy(userId: number) {
    return this.prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException("Project not found");
    }

    return project;
  }

  async update(id: number, dto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.project.delete({ where: { id } });
  }

  // ✅ Project ↔ Target (e.g., Page, Component...) ბმის ფუნქცია
  async linkTo(
    projectId: number,
    targetModel: SupportedModel,
    targetId: number,
  ) {
    return this.relationshipService.linkToSource("project", projectId, [
      { targetModel, targetId },
    ]);
  }

  // ✅ მრავალ ელემენტზე ბმის ფუნქცია
  async bulkLink(
    projectId: number,
    targetModel: SupportedModel,
    targetIds: number[],
  ) {
    return this.relationshipService.bulkLinkToSource(
      "project",
      projectId,
      targetModel,
      targetIds,
    );
  }

  // ✅ სრული საბმისალ ბმის ვარიანტი
  async linkCustom(
    sourceModel: SupportedModel,
    sourceId: number,
    targetModel: SupportedModel,
    targetId: number,
  ) {
    return this.relationshipService.linkEntities(
      sourceModel,
      sourceId,
      targetModel,
      targetId,
    );
  }
}
