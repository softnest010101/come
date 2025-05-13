// ✅ my-platform/src/component/component.module.ts

import { Module } from "@nestjs/common";
import { ComponentService } from "./component.service";
import { ComponentController } from "./component.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { DuplicationService } from "../shared/duplication.service";
import { RelationshipService } from "../shared/relationship.service"; // ✅ დამატებულია

@Module({
  imports: [PrismaModule],
  controllers: [ComponentController],
  providers: [
    ComponentService,
    DuplicationService,
    RelationshipService, // ✅ დაემატა როგორც პროვაიდერი
  ],
})
export class ComponentModule {}
