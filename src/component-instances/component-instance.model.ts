import { Module } from '@nestjs/common';
import { ComponentInstanceService } from './services/component-instance.service';
import { ComponentInstanceController } from './controllers/component-instance.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ComponentInstanceController],
  providers: [ComponentInstanceService],
})
export class ComponentInstanceModule {}
