import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateStatusApplyBody  {
  @ApiProperty({
    example: 6,
    required: true 
  })
  @IsNotEmpty()
  @IsNumber()
  id: number

  @ApiProperty({
    example: 4,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  strategy: number
}