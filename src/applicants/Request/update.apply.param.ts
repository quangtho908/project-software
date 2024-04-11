import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class UpdateApplyParam {
  @ApiProperty({
    example: 6,
    required: true 
  })
  @IsNotEmpty()
  @IsNumberString()
  id: number

  @ApiProperty({
    example: 4,
    required: true
  })
  @IsNotEmpty()
  @IsNumberString()
  strategy: number
}