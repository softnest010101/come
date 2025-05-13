// ✅ my-platform/src/widget-instance/widget-instance.controller.ts

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
import { WidgetInstanceService } from "./widget-instance.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateWidgetInstanceDto } from "./dto/create-widget-instance.dto";
import { UpdateWidgetInstanceDto } from "./dto/update-widget-instance.dto";
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

@ApiTags("WidgetInstances")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("widget-instances")
export class WidgetInstanceController {
  constructor(
    private readonly widgetInstanceService: WidgetInstanceService,
    private readonly duplicationService: DuplicationService,
    private readonly relationshipService: RelationshipService,
  ) {}

  @Post()
  @ApiBody({ type: CreateWidgetInstanceDto })
  @ApiResponse({ status: 201, description: "WidgetInstance created" })
  create(@Req() req: Request, @Body() dto: CreateWidgetInstanceDto) {
    const userId = (req.user as { id: number }).id;
    return this.widgetInstanceService.create(userId, dto);
  }

  @Get("my")
  @ApiResponse({ status: 200, description: "List of user's widget instances" })
  findMy(@Req() req: Request) {
    const userId = (req.user as { id: number }).id;
    return this.widgetInstanceService.findMy(userId);
  }

  @Get(":id")
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Single widget instance by ID" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.widgetInstanceService.findOne(id);
  }

  @Patch(":id")
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateWidgetInstanceDto })
  @ApiResponse({ status: 200, description: "WidgetInstance updated" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateWidgetInstanceDto,
  ) {
    return this.widgetInstanceService.update(id, dto);
  }

  @Delete(":id")
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "WidgetInstance deleted" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.widgetInstanceService.remove(id);
  }

  @Post(":id/duplicate")
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 201, description: "WidgetInstance duplicated" })
  duplicate(@Param("id", ParseIntPipe) id: number) {
    return this.duplicationService.duplicateProject(id);
  }

  @Post(":id/link/:targetModel/:targetId")
  @ApiParam({ name: "id", type: Number })
  @ApiParam({ name: "targetModel", type: String })
  @ApiParam({ name: "targetId", type: Number })
  @ApiResponse({ status: 200, description: "Linked single model" })
  linkSingle(
    @Param("id", ParseIntPipe) widgetInstanceId: number,
    @Param("targetModel") targetModel: SupportedModel,
    @Param("targetId", ParseIntPipe) targetId: number,
  ) {
    return this.widgetInstanceService.linkTo(
      widgetInstanceId,
      targetModel,
      targetId,
    );
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
    @Param("id", ParseIntPipe) widgetInstanceId: number,
    @Body() body: { targetModel: SupportedModel; targetIds: number[] },
  ) {
    return this.widgetInstanceService.bulkLink(
      widgetInstanceId,
      body.targetModel,
      body.targetIds,
    );
  }
}
