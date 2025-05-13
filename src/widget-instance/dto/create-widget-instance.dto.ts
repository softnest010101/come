import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsObject,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ToolType } from "../../shared/tool-meta/tool-type.enum";

export class CreateWidgetInstanceDto {
  @ApiProperty({
    description: "WidgetInstance name",
    example: "My Calendar Widget",
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: "Optional description of the widget",
    required: false,
    example: "This is a calendar widget for event tracking.",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Type of the widget instance",
    enum: ToolType,
    example: ToolType.Calendar,
  })
  @IsNotEmpty()
  @IsEnum(ToolType)
  type!: ToolType;

  @ApiProperty({
    description: "Optional configuration object for the widget",
    required: false,
    type: Object,
    example: { showWeekends: true, startHour: 9 },
  })
  @IsOptional()
  @IsObject()
  config?: Record<string, any>;
}
