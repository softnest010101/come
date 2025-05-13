// ✅ my-platform/src/widget-instance/widget-instance.module.ts

import { Module } from "@nestjs/common";
import { WidgetInstanceService } from "./widget-instance.service";
import { WidgetInstanceController } from "./widget-instance.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { DuplicationService } from "../shared/duplication.service";
import { RelationshipService } from "../shared/relationship.service"; // ✅ დამატებულია

@Module({
  imports: [PrismaModule],
  controllers: [WidgetInstanceController],
  providers: [
    WidgetInstanceService,
    DuplicationService,
    RelationshipService, // ✅ დაემატა როგორც პროვაიდერი
  ],
})
export class WidgetInstanceModule {}
