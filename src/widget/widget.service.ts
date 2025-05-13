// ✅ my-platform/src/widget/widget.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateWidgetDto } from "./dto/create-widget.dto";
import { UpdateWidgetDto } from "./dto/update-widget.dto";
import {
  RelationshipService,
  SupportedModel,
} from "../shared/relationship.service";

@Injectable()
export class WidgetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly relationshipService: RelationshipService,
  ) {}

  async create(userId: number, dto: CreateWidgetDto) {
    return this.prisma.widget.create({
      data: {
        name: dto.name,
        description: dto.description,
        ownerId: userId,
      },
    });
  }

  async findMy(userId: number) {
    return this.prisma.widget.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: number) {
    const widget = await this.prisma.widget.findUnique({
      where: { id },
    });

    if (!widget) {
      throw new NotFoundException("Widget not found");
    }

    return widget;
  }

  async update(id: number, dto: UpdateWidgetDto) {
    return this.prisma.widget.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.widget.delete({ where: { id } });
  }

  async linkTo(
    widgetId: number,
    targetModel: SupportedModel,
    targetId: number,
  ) {
    return this.relationshipService.linkToSource("widget", widgetId, [
      { targetModel, targetId },
    ]);
  }

  async bulkLink(
    widgetId: number,
    targetModel: SupportedModel,
    targetIds: number[],
  ) {
    return this.relationshipService.bulkLinkToSource(
      "widget",
      widgetId,
      targetModel,
      targetIds,
    );
  }

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
