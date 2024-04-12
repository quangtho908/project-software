import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class CreateSchoolUserBody {

  @ApiProperty({
    example: "test@example.com",
    required: true
  })
  @IsNotEmpty()
  @IsEmail()
  public email: string

  @ApiProperty({
    example: "Trần Cẩm Ly",
    required: true
  })
  @IsNotEmpty()
  fullName: string

  @ApiProperty({
    example: 1,
    required: true 
  })
  @IsNotEmpty()
  @IsNumber()
  public universityId: number
}