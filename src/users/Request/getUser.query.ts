import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsNumberString, ValidateIf } from "class-validator";
import * as _ from "lodash";

export class GetUserQuery {
  @ApiProperty({
    example: 1,
    required: false
  })
  @ValidateIf((object, value) => !_.isEmpty(value))
  @IsNumberString()
  id: number

  @ApiProperty({
    example: 1,
    required: false
  })
  @ValidateIf((object, value) => !_.isEmpty(value))
  @IsNumberString()
  university: number
}