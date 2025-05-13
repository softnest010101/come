// ✅ my-platform/src/component/component.controller.ts

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
import { ComponentService } from "./component.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateComponentDto } from "./dto/create-component.dto";
import { UpdateComponentDto } from "./dto/update-component.dto";
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

@ApiTags("Components")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("components")
export class ComponentController {
  constructor(
    private readonly componentService: ComponentService,
    private readonly duplicationService: DuplicationService,
    private readonly relationshipService: RelationshipService,
  ) {}

  @Post()
  @ApiBody({ type: CreateComponentDto })
  @ApiResponse({ status: 201, description: "Component created" })
  create(@Req() req: Request, @Body() dto: CreateComponentDto) {
    const userId = (req.user as { id: number }).id;
    return this.componentService.create(userId, dto);
  }

  @Get("my")
  @ApiResponse({ status: 200, description: "List of user's components" })
  findMy(@Req() req: Request) {
    const userId = (req.user as { id: number }).id;
    return this.componentService.findMy(userId);
  }

  @Get(":id")
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Single component by ID" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.componentService.findOne(id);
  }

  @Patch(":id")
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateComponentDto })
  @ApiResponse({ status: 200, description: "Component updated" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateComponentDto,
  ) {
    return this.componentService.update(id, dto);
  }

  @Delete(":id")
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Component deleted" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.componentService.remove(id);
  }

  @Post(":id/duplicate")
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 201, description: "Component duplicated" })
  duplicate(@Param("id", ParseIntPipe) id: number) {
    return this.duplicationService.duplicateProject(id); // შემდეგ ჩასვით დუბლირების შესაბამისი მეთოდი
  }

  @Post(":id/link/:targetModel/:targetId")
  @ApiParam({ name: "id", type: Number })
  @ApiParam({ name: "targetModel", type: String })
  @ApiParam({ name: "targetId", type: Number })
  @ApiResponse({ status: 200, description: "Linked single model" })
  linkSingle(
    @Param("id", ParseIntPipe) componentId: number,
    @Param("targetModel") targetModel: SupportedModel,
    @Param("targetId", ParseIntPipe) targetId: number,
  ) {
    return this.componentService.linkTo(componentId, targetModel, targetId);
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
    @Param("id", ParseIntPipe) componentId: number,
    @Body() body: { targetModel: SupportedModel; targetIds: number[] },
  ) {
    return this.componentService.bulkLink(
      componentId,
      body.targetModel,
      body.targetIds,
    );
  }
}
