import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePageDto {
  @ApiProperty({ description: "Page name" })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ description: "Optional description", required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
