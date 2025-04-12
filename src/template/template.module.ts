import { Module } from '@nestjs/common';
import { TemplateService } from './services/template.service';
import { TemplateController } from './controllers/template.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WidgetInstanceModule } from 'src/widget-instance/widget-instance.module'; // ✅ Import the module

@Module({
  imports: [PrismaModule, WidgetInstanceModule], // ✅ Add WidgetInstanceModule to imports
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}
