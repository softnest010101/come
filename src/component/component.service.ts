// ✅ my-platform/src/component/component.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateComponentDto } from "./dto/create-component.dto";
import { UpdateComponentDto } from "./dto/update-component.dto";
import {
  RelationshipService,
  SupportedModel,
} from "../shared/relationship.service";

@Injectable()
export class ComponentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly relationshipService: RelationshipService,
  ) {}

  async create(userId: number, dto: CreateComponentDto) {
    return this.prisma.component.create({
      data: {
        name: dto.name,
        description: dto.description,
        ownerId: userId,
      },
    });
  }

  async findMy(userId: number) {
    return this.prisma.component.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: number) {
    const component = await this.prisma.component.findUnique({
      where: { id },
    });

    if (!component) {
      throw new NotFoundException("Component not found");
    }

    return component;
  }

  async update(id: number, dto: UpdateComponentDto) {
    return this.prisma.component.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.component.delete({ where: { id } });
  }

  // ✅ Component ↔ Target (e.g., Page, Widget...) ბმის ფუნქცია
  async linkTo(
    componentId: number,
    targetModel: SupportedModel,
    targetId: number,
  ) {
    return this.relationshipService.linkToSource("component", componentId, [
      { targetModel, targetId },
    ]);
  }

  // ✅ მრავალ ელემენტზე ბმის ფუნქცია
  async bulkLink(
    componentId: number,
    targetModel: SupportedModel,
    targetIds: number[],
  ) {
    return this.relationshipService.bulkLinkToSource(
      "component",
      componentId,
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
