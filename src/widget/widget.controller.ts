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
import { WidgetService } from "./widget.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateWidgetDto } from "./dto/create-widget.dto";
import { UpdateWidgetDto } from "./dto/update-widget.dto";
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

@ApiTags("Widgets")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("widgets")
export class WidgetController {
  constructor(
    private readonly widgetService: WidgetService,
    private readonly duplicationService: DuplicationService,
    private readonly relationshipService: RelationshipService,
  ) {}

  @Post()
  @ApiBody({ type: CreateWidgetDto })
  @ApiResponse({ status: 201, description: "Widget created" })
  create(@Req() req: Request, @Body() dto: CreateWidgetDto) {
    const userId = (req.user as { id: number }).id;
    return this.widgetService.create(userId, dto);
  }

  @Get("my")
  @ApiResponse({ status: 200, description: "List of user's widgets" })
  findMy(@Req() req: Request) {
    const userId = (req.user as { id: number }).id;
    return this.widgetService.findMy(userId);
  }

  @Get(":id")
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Single widget by ID" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.widgetService.findOne(id);
  }

  @Patch(":id")
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateWidgetDto })
  @ApiResponse({ status: 200, description: "Widget updated" })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateWidgetDto) {
    return this.widgetService.update(id, dto);
  }

  @Delete(":id")
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Widget deleted" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.widgetService.remove(id);
  }

  @Post(":id/duplicate")
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 201, description: "Widget duplicated" })
  duplicate(@Param("id", ParseIntPipe) id: number) {
    return this.duplicationService.duplicateProject(id);
  }

  @Post(":id/link/:targetModel/:targetId")
  @ApiParam({ name: "id", type: Number })
  @ApiParam({ name: "targetModel", type: String })
  @ApiParam({ name: "targetId", type: Number })
  @ApiResponse({ status: 200, description: "Linked single model" })
  linkSingle(
    @Param("id", ParseIntPipe) widgetId: number,
    @Param("targetModel") targetModel: SupportedModel,
    @Param("targetId", ParseIntPipe) targetId: number,
  ) {
    return this.widgetService.linkTo(widgetId, targetModel, targetId);
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
    @Param("id", ParseIntPipe) widgetId: number,
    @Body() body: { targetModel: SupportedModel; targetIds: number[] },
  ) {
    return this.widgetService.bulkLink(
      widgetId,
      body.targetModel,
      body.targetIds,
    );
  }
}
