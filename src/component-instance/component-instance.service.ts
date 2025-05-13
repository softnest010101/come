import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateComponentInstanceDto } from "./dto/create-component-instance.dto";
import { UpdateComponentInstanceDto } from "./dto/update-component-instance.dto";
import {
  RelationshipService,
  SupportedModel,
} from "../shared/relationship.service";

@Injectable()
export class ComponentInstanceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly relationshipService: RelationshipService,
  ) {}

  async create(userId: number, dto: CreateComponentInstanceDto) {
    return this.prisma.componentInstance.create({
      data: {
        name: dto.name,
        description: dto.description,
        ownerId: userId,
      },
    });
  }

  async findMy(userId: number) {
    return this.prisma.componentInstance.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: number) {
    const instance = await this.prisma.componentInstance.findUnique({
      where: { id },
    });

    if (!instance) {
      throw new NotFoundException("ComponentInstance not found");
    }

    return instance;
  }

  async update(id: number, dto: UpdateComponentInstanceDto) {
    return this.prisma.componentInstance.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.componentInstance.delete({ where: { id } });
  }

  async linkTo(
    componentInstanceId: number,
    targetModel: SupportedModel,
    targetId: number,
  ) {
    return this.relationshipService.linkToSource(
      "componentInstance",
      componentInstanceId,
      [{ targetModel, targetId }],
    );
  }

  async bulkLink(
    componentInstanceId: number,
    targetModel: SupportedModel,
    targetIds: number[],
  ) {
    return this.relationshipService.bulkLinkToSource(
      "componentInstance",
      componentInstanceId,
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
