import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UniversityCreateBody {

  @ApiProperty({
    example: "Trường đại học Ngoại Thương",
    required: true
  })
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    example: "1HA",
    required: true
  })
  @IsNotEmpty()
  public code: string;

  @ApiProperty({
    example: ""
  })
  public image: string;
}