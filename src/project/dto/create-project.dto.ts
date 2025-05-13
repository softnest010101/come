import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectDto {
  @ApiProperty({ description: "Project name" })
  @IsNotEmpty()
  @IsString()
  name!: string; // ✅ fixed with non-null assertion

  @ApiProperty({ description: "Optional description", required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
