import { Module } from '@nestjs/common';
import { WidgetInstanceService } from './services/widget-instance.service';
import { WidgetInstanceController } from './controllers/widget-instance.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WidgetInstanceController],
  providers: [WidgetInstanceService],
  exports: [WidgetInstanceService], // ✅ Ensure the service is exported
})
export class WidgetInstanceModule {}
