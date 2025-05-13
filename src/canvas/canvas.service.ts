import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SaveCanvasDto } from "./dto/save-canvas.dto";
import { Canvas } from "@prisma/client";

@Injectable()
export class CanvasService {
  constructor(private readonly prisma: PrismaService) {}

  async saveCanvas(dto: SaveCanvasDto): Promise<{
    message: string;
    id: number;
    createdAt: Date;
  }> {
    const canvas: Canvas = await this.prisma.canvas.create({
      data: {
        tools: JSON.parse(JSON.stringify(dto.tools)), // ✅ ეს ხსნის JsonValue შეცდომას
      },
    });

    return {
      message: "Canvas saved to DB",
      id: canvas.id,
      createdAt: canvas.createdAt,
    };
  }
}
