import { Module } from '@nestjs/common';
import { ComponentService } from './services/component.service';
import { ComponentController } from './controllers/component.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ComponentController],
  providers: [ComponentService, PrismaService],
  exports: [ComponentService],
})
export class ComponentModule {}
