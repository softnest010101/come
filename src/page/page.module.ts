// ✅ my-platform/src/page/page.module.ts

import { Module } from "@nestjs/common";
import { PageService } from "./page.service";
import { PageController } from "./page.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { DuplicationService } from "../shared/duplication.service";
import { RelationshipService } from "../shared/relationship.service";

@Module({
  imports: [PrismaModule],
  controllers: [PageController],
  providers: [PageService, DuplicationService, RelationshipService],
})
export class PageModule {}
