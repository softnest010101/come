import { Module } from '@nestjs/common';
import { WidgetController } from './controllers/widget.controller';
import { WidgetService } from './services/widget.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [WidgetController],
  providers: [WidgetService, PrismaService],
  exports: [WidgetService],
})
export class WidgetModule {}
