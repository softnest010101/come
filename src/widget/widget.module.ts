import { Module } from '@nestjs/common';
import { WidgetService } from './widget.service';
import { WidgetController } from './widget.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [WidgetController],
  providers: [WidgetService],
  imports: [PrismaModule],
})
export class WidgetModule {}
