// ✅ my-platform/src/component/dto/update-component.dto.ts

import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateComponentDto {
  @ApiProperty({ description: "Updated name", required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: "Updated description", required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
