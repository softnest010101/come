// ✅ my-platform/src/widget-instance/widget-instance.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateWidgetInstanceDto } from "./dto/create-widget-instance.dto";
import { UpdateWidgetInstanceDto } from "./dto/update-widget-instance.dto";
import {
  RelationshipService,
  SupportedModel,
} from "../shared/relationship.service";
import { TOOL_REGISTRY } from "../shared/tool-meta/tool.registry";
import { ToolType } from "../shared/tool-meta/tool-type.enum";

@Injectable()
export class WidgetInstanceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly relationshipService: RelationshipService,
  ) {}

  async create(userId: number, dto: CreateWidgetInstanceDto) {
    const config =
      dto.config && Object.keys(dto.config).length > 0
        ? dto.config
        : this.getDefaultConfig(dto.type as ToolType);

    return this.prisma.widgetInstance.create({
      data: {
        name: dto.name,
        description: dto.description,
        type: dto.type,
        config,
        ownerId: userId,
      },
    });
  }

  private getDefaultConfig(type: ToolType): Record<string, any> {
    const tool = TOOL_REGISTRY.find((t) => t.type === type);
    return tool?.defaultConfig ?? {};
  }

  async findMy(userId: number) {
    return this.prisma.widgetInstance.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: number) {
    const widgetInstance = await this.prisma.widgetInstance.findUnique({
      where: { id },
    });

    if (!widgetInstance) {
      throw new NotFoundException("WidgetInstance not found");
    }

    return widgetInstance;
  }

  async update(id: number, dto: UpdateWidgetInstanceDto) {
    return this.prisma.widgetInstance.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.widgetInstance.delete({ where: { id } });
  }

  async linkTo(
    widgetInstanceId: number,
    targetModel: SupportedModel,
    targetId: number,
  ) {
    return this.relationshipService.linkToSource(
      "widgetInstance",
      widgetInstanceId,
      [{ targetModel, targetId }],
    );
  }

  async bulkLink(
    widgetInstanceId: number,
    targetModel: SupportedModel,
    targetIds: number[],
  ) {
    return this.relationshipService.bulkLinkToSource(
      "widgetInstance",
      widgetInstanceId,
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
