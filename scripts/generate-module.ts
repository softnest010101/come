import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';

const moduleName = process.argv[2];
if (!moduleName) {
  console.error('❌ Module name is required.\nUsage: npm run generate <name>');
  process.exit(1);
}

const capitalized = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
const basePath = path.join('src', moduleName);
const dtoPath = path.join(basePath, 'dto');

if (!existsSync(basePath)) mkdirSync(basePath);
if (!existsSync(dtoPath)) mkdirSync(dtoPath);

// DTOs
writeFileSync(path.join(dtoPath, `create-${moduleName}.dto.ts`),
`import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class Create${capitalized}Dto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  content?: string;
}
`);

writeFileSync(path.join(dtoPath, `update-${moduleName}.dto.ts`),
`import { PartialType } from '@nestjs/swagger';
import { Create${capitalized}Dto } from './create-${moduleName}.dto';

export class Update${capitalized}Dto extends PartialType(Create${capitalized}Dto) {}
`);

// Service
writeFileSync(path.join(basePath, `${moduleName}.service.ts`),
`import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Create${capitalized}Dto } from './dto/create-${moduleName}.dto';
import { Update${capitalized}Dto } from './dto/update-${moduleName}.dto';

@Injectable()
export class ${capitalized}Service {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: Create${capitalized}Dto, userId: number) {
    return this.prisma.${moduleName}.create({ data: { ...dto, ownerId: userId } });
  }

  findAll(userId: number) {
    return this.prisma.${moduleName}.findMany({ where: { ownerId: userId } });
  }

  findOne(id: number, userId: number) {
    return this.prisma.${moduleName}.findFirst({ where: { id, ownerId: userId } });
  }

  async update(id: number, dto: Update${capitalized}Dto, userId: number) {
    const existing = await this.findOne(id, userId);
    if (!existing) throw new NotFoundException('${capitalized} not found');
    return this.prisma.${moduleName}.update({ where: { id }, data: dto });
  }

  async remove(id: number, userId: number) {
    const existing = await this.findOne(id, userId);
    if (!existing) throw new NotFoundException('${capitalized} not found');
    return this.prisma.${moduleName}.delete({ where: { id } });
  }
}
`);

// Controller
writeFileSync(path.join(basePath, `${moduleName}.controller.ts`),
`import {
  Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards, ParseIntPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { ${capitalized}Service } from './${moduleName}.service';
import { Create${capitalized}Dto } from './dto/create-${moduleName}.dto';
import { Update${capitalized}Dto } from './dto/update-${moduleName}.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('${capitalized}')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('${moduleName}s')
export class ${capitalized}Controller {
  constructor(private readonly service: ${capitalized}Service) {}

  @Post()
  create(@Body() dto: Create${capitalized}Dto, @Req() req: Request) {
    return this.service.create(dto, req.user.id);
  }

  @Get('my')
  findAll(@Req() req: Request) {
    return this.service.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.service.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: Update${capitalized}Dto, @Req() req: Request) {
    return this.service.update(id, dto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.service.remove(id, req.user.id);
  }
}
`);

// Module
writeFileSync(path.join(basePath, `${moduleName}.module.ts`),
`import { Module } from '@nestjs/common';
import { ${capitalized}Service } from './${moduleName}.service';
import { ${capitalized}Controller } from './${moduleName}.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [${capitalized}Controller],
  providers: [${capitalized}Service],
  imports: [PrismaModule],
})
export class ${capitalized}Module {}
`);
console.log(`✅ Module '${moduleName}' generated successfully!`);
