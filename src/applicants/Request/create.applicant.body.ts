import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateApplicantBody {
  @ApiProperty({
    example: "Nguyễn Quang Thọ",
    required: true
  })
  @IsNotEmpty()
  public fullName: string;

  @ApiProperty({
    example: "quangtho.developer@gmail.com",
    required: true
  })
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty({
    example: 1,
    required: true
  })
  @IsNotEmpty()
  public university: number;

  @ApiProperty({
    example: "20130414",
    required: true
  })
  @IsNotEmpty()
  public mssv: string;

  @ApiProperty({
    example: "Giao tiếp, thuyết trình",
    required: true
  })
  @IsNotEmpty()
  public skill: string;

  @ApiProperty({
    example: 1,
    required: true
  })
  @IsNotEmpty()
  public strategy: number;
}