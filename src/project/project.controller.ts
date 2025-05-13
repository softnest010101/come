// ✅ my-platform/src/project/project.controller.ts

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
import { ProjectService } from "./project.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
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

@ApiTags("Projects")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("projects")
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly duplicationService: DuplicationService,
    private readonly relationshipService: RelationshipService,
  ) {}

  @Post()
  @ApiBody({ type: CreateProjectDto })
  @ApiResponse({ status: 201, description: "Project created" })
  create(@Req() req: Request, @Body() dto: CreateProjectDto) {
    const userId = (req.user as { id: number }).id;
    return this.projectService.create(userId, dto);
  }

  @Get("my")
  @ApiResponse({ status: 200, description: "List of user's projects" })
  findMy(@Req() req: Request) {
    const userId = (req.user as { id: number }).id;
    return this.projectService.findMy(userId);
  }

  @Get(":id")
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Single project by ID" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.projectService.findOne(id);
  }

  @Patch(":id")
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateProjectDto })
  @ApiResponse({ status: 200, description: "Project updated" })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateProjectDto) {
    return this.projectService.update(id, dto);
  }

  @Delete(":id")
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Project deleted" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.projectService.remove(id);
  }

  @Post(":id/duplicate")
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 201, description: "Project duplicated" })
  duplicate(@Param("id", ParseIntPipe) id: number) {
    return this.duplicationService.duplicateProject(id);
  }

  @Post(":id/link/:targetModel/:targetId")
  @ApiParam({ name: "id", type: Number })
  @ApiParam({ name: "targetModel", type: String })
  @ApiParam({ name: "targetId", type: Number })
  @ApiResponse({ status: 200, description: "Linked single model" })
  linkSingle(
    @Param("id", ParseIntPipe) projectId: number,
    @Param("targetModel") targetModel: SupportedModel,
    @Param("targetId", ParseIntPipe) targetId: number,
  ) {
    return this.projectService.linkTo(projectId, targetModel, targetId);
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
    @Param("id", ParseIntPipe) projectId: number,
    @Body() body: { targetModel: SupportedModel; targetIds: number[] },
  ) {
    return this.projectService.bulkLink(
      projectId,
      body.targetModel,
      body.targetIds,
    );
  }
}
