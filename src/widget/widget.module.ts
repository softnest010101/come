import { Module } from "@nestjs/common";
import { WidgetService } from "./widget.service";
import { WidgetController } from "./widget.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { DuplicationService } from "../shared/duplication.service";
import { RelationshipService } from "../shared/relationship.service";

@Module({
  imports: [PrismaModule],
  controllers: [WidgetController],
  providers: [WidgetService, DuplicationService, RelationshipService],
})
export class WidgetModule {}
