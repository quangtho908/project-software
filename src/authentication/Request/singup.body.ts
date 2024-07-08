import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import * as _ from "lodash";

export class SignupBody {

  @IsNotEmpty({message: "Email or Password is invalid!"})
  @IsEmail()
  @ApiProperty({
    example: "quangtho23062002@gmail.com",
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: "quangtho2306",
    required: true
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    example: "quang tho",
    required: true
  })
  fullName: string

  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    required: true
  })
  universityId: number
}