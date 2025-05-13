import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { CanvasService } from "./canvas.service";
import { SaveCanvasDto } from "./dto/save-canvas.dto";

@Controller("canvas")
export class CanvasController {
  constructor(private readonly canvasService: CanvasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  saveCanvas(@Body() dto: SaveCanvasDto) {
    return this.canvasService.saveCanvas(dto);
  }
}
