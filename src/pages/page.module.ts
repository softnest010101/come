import { Module } from '@nestjs/common';
import { PageController } from './controllers/page.controller';
import { PageService } from './services/page.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PageController],
  providers: [PageService, PrismaService],
  exports: [PageService],
})
export class PageModule {}
