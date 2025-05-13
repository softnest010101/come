import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import {
  RelationshipService,
  SupportedModel,
} from "../shared/relationship.service";

@Injectable()
export class PageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly relationshipService: RelationshipService,
  ) {}

  async create(userId: number, dto: CreatePageDto) {
    return this.prisma.page.create({
      data: {
        name: dto.name,
        description: dto.description,
        ownerId: userId,
      },
    });
  }

  async findMy(userId: number) {
    return this.prisma.page.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: number) {
    const page = await this.prisma.page.findUnique({ where: { id } });
    if (!page) throw new NotFoundException("Page not found");
    return page;
  }

  async update(id: number, dto: UpdatePageDto) {
    return this.prisma.page.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.page.delete({ where: { id } });
  }

  async linkTo(pageId: number, targetModel: SupportedModel, targetId: number) {
    return this.relationshipService.linkToSource("page", pageId, [
      { targetModel, targetId },
    ]);
  }

  async bulkLink(
    pageId: number,
    targetModel: SupportedModel,
    targetIds: number[],
  ) {
    return this.relationshipService.bulkLinkToSource(
      "page",
      pageId,
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
