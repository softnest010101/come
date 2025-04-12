import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ComponentInstanceService } from '../services/component-instance.service';
import { CreateComponentInstanceDto } from '../dto/create-component-instance.dto';
import { UpdateComponentInstanceDto } from '../dto/update-component-instance.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('ComponentInstances')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('component-instances')
export class ComponentInstanceController {
  constructor(
    private readonly componentInstanceService: ComponentInstanceService,
  ) {}

  @Post()
  @ApiBody({ type: CreateComponentInstanceDto })
  @ApiResponse({ status: 201, description: 'ComponentInstance created' })
  create(@Body() dto: CreateComponentInstanceDto) {
    return this.componentInstanceService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of component instances' })
  findAll() {
    return this.componentInstanceService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Single ComponentInstance' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.componentInstanceService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateComponentInstanceDto })
  @ApiResponse({ status: 200, description: 'ComponentInstance updated' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateComponentInstanceDto,
  ) {
    return this.componentInstanceService.update(id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'ComponentInstance deleted' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.componentInstanceService.remove(id);
  }
}
