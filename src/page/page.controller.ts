import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
} from "@nestjs/common";
import { Request } from "express";
import { PageService } from "./page.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";
import { DuplicationService } from "../shared/duplication.service";
import {
  RelationshipService,
  SupportedModel,
} from "../shared/relationship.service";

@ApiTags("Pages")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("pages")
export class PageController {
  constructor(
    private readonly pageService: PageService,
    private readonly duplicationService: DuplicationService,
    private readonly relationshipService: RelationshipService,
  ) {}

  @Post()
  @ApiBody({ type: CreatePageDto })
  @ApiResponse({ status: 201, description: "Page created" })
  create(@Req() req: Request, @Body() dto: CreatePageDto) {
    const userId = (req.user as { id: number }).id;
    return this.pageService.create(userId, dto);
  }

  @Get("my")
  @ApiResponse({ status: 200, description: "List of user's pages" })
  findMy(@Req() req: Request) {
    const userId = (req.user as { id: number }).id;
    return this.pageService.findMy(userId);
  }

  @Get(":id")
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Single page by ID" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.pageService.findOne(id);
  }

  @Patch(":id")
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdatePageDto })
  @ApiResponse({ status: 200, description: "Page updated" })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdatePageDto) {
    return this.pageService.update(id, dto);
  }

  @Delete(":id")
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Page deleted" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.pageService.remove(id);
  }

  @Post(":id/duplicate")
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 201, description: "Page duplicated" })
  duplicate(@Param("id", ParseIntPipe) id: number) {
    return this.duplicationService.duplicatePage(id);
  }

  @Post(":id/link/:targetModel/:targetId")
  @ApiParam({ name: "id", type: Number })
  @ApiParam({ name: "targetModel", type: String })
  @ApiParam({ name: "targetId", type: Number })
  @ApiResponse({ status: 200, description: "Linked single model" })
  linkSingle(
    @Param("id", ParseIntPipe) pageId: number,
    @Param("targetModel") targetModel: SupportedModel,
    @Param("targetId", ParseIntPipe) targetId: number,
  ) {
    return this.pageService.linkTo(pageId, targetModel, targetId);
  }

  @Post(":id/bulk-link")
  @ApiParam({ name: "id", type: Number })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        targetModel: { type: "string" },
        targetIds: {
          type: "array",
          items: { type: "number" },
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: "Bulk-linked models" })
  bulkLink(
    @Param("id", ParseIntPipe) pageId: number,
    @Body() body: { targetModel: SupportedModel; targetIds: number[] },
  ) {
    return this.pageService.bulkLink(pageId, body.targetModel, body.targetIds);
  }
}
