import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class ToolConfig {
  [key: string]: any; // Later you can replace this with specific config types
}

class PlacedTool {
  id!: string;
  type!: string;

  @ValidateNested()
  @Type(() => ToolConfig)
  config!: ToolConfig;
}

export class SaveCanvasDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlacedTool)
  tools!: PlacedTool[];
}
