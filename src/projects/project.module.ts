import { Module } from '@nestjs/common';
import { ProjectService } from './services/project.service';
import { ProjectController } from './controllers/project.controller';
import { PrismaService } from '../prisma/prisma.service';
import { TemplateModule } from '../templates/template.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService],
  imports: [TemplateModule], // ✅ დამატებულია
  exports: [ProjectService],
})
export class ProjectModule {}
