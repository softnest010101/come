// ✅ my-platform/src/project/project.module.ts

import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { DuplicationService } from "../shared/duplication.service";
import { RelationshipService } from "../shared/relationship.service"; // ✅ დამატებულია

@Module({
  imports: [PrismaModule],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    DuplicationService,
    RelationshipService, // ✅ დაემატა როგორც პროვაიდერი
  ],
})
export class ProjectModule {}
