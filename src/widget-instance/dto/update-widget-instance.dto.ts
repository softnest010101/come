import { IsOptional, IsString, IsEnum, IsObject } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ToolType } from "../../shared/tool-meta/tool-type.enum";

export class UpdateWidgetInstanceDto {
  @ApiProperty({
    description: "Updated name of the widget instance",
    required: false,
    example: "Updated Calendar Widget",
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "Updated description of the widget instance",
    required: false,
    example: "Updated description for calendar widget",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Updated type of the widget instance",
    required: false,
    enum: ToolType,
    example: ToolType.Form,
  })
  @IsOptional()
  @IsEnum(ToolType)
  type?: ToolType;

  @ApiProperty({
    description: "Updated configuration object",
    required: false,
    type: Object,
    example: { showWeekends: false, startHour: 8 },
  })
  @IsOptional()
  @IsObject()
  config?: Record<string, any>;
}
