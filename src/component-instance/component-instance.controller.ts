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
import { ComponentInstanceService } from "./component-instance.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateComponentInstanceDto } from "./dto/create-component-instance.dto";
import { UpdateComponentInstanceDto } from "./dto/update-component-instance.dto";
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

@ApiTags("ComponentInstances")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("component-instances")
export class ComponentInstanceController {
  constructor(
    private readonly componentInstanceService: ComponentInstanceService,
    private readonly duplicationService: DuplicationService,
    private readonly relationshipService: RelationshipService,
  ) {}

  @Post()
  @ApiBody({ type: CreateComponentInstanceDto })
  @ApiResponse({ status: 201, description: "ComponentInstance created" })
  create(@Req() req: Request, @Body() dto: CreateComponentInstanceDto) {
    const userId = (req.user as { id: number }).id;
    return this.componentInstanceService.create(userId, dto);
  }

  @Get("my")
  @ApiResponse({
    status: 200,
    description: "List of user's component instances",
  })
  findMy(@Req() req: Request) {
    const userId = (req.user as { id: number }).id;
    return this.componentInstanceService.findMy(userId);
  }

  @Get(":id")
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Single component instance by ID" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.componentInstanceService.findOne(id);
  }

  @Patch(":id")
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateComponentInstanceDto })
  @ApiResponse({ status: 200, description: "ComponentInstance updated" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateComponentInstanceDto,
  ) {
    return this.componentInstanceService.update(id, dto);
  }

  @Delete(":id")
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "ComponentInstance deleted" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.componentInstanceService.remove(id);
  }

  @Post(":id/duplicate")
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 201, description: "ComponentInstance duplicated" })
  duplicate(@Param("id", ParseIntPipe) id: number) {
    return this.duplicationService.duplicateProject(id); // ❗optional: use duplicateComponentInstance(id)
  }

  @Post(":id/link/:targetModel/:targetId")
  @ApiParam({ name: "id", type: Number })
  @ApiParam({ name: "targetModel", type: String })
  @ApiParam({ name: "targetId", type: Number })
  @ApiResponse({ status: 200, description: "Linked single model" })
  linkSingle(
    @Param("id", ParseIntPipe) componentInstanceId: number,
    @Param("targetModel") targetModel: SupportedModel,
    @Param("targetId", ParseIntPipe) targetId: number,
  ) {
    return this.componentInstanceService.linkTo(
      componentInstanceId,
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
    @Param("id", ParseIntPipe) componentInstanceId: number,
    @Body() body: { targetModel: SupportedModel; targetIds: number[] },
  ) {
    return this.componentInstanceService.bulkLink(
      componentInstanceId,
      body.targetModel,
      body.targetIds,
    );
  }
}
