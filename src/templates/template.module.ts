import { Module } from '@nestjs/common';
import { TemplateController } from './controllers/template.controller';
import { TemplateService } from './services/template.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TemplateController],
  providers: [TemplateService, PrismaService], // ✅ PrismaService დაემატა
  exports: [TemplateService],
})
export class TemplateModule {}
