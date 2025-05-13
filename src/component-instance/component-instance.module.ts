// ✅ my-platform/src/component-instance/component-instance.module.ts

import { Module } from "@nestjs/common";
import { ComponentInstanceService } from "./component-instance.service";
import { ComponentInstanceController } from "./component-instance.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { DuplicationService } from "../shared/duplication.service";
import { RelationshipService } from "../shared/relationship.service"; // ✅ დამატებულია

@Module({
  imports: [PrismaModule],
  controllers: [ComponentInstanceController],
  providers: [
    ComponentInstanceService,
    DuplicationService,
    RelationshipService, // ✅ დაემატა როგორც პროვაიდერი
  ],
})
export class ComponentInstanceModule {}
