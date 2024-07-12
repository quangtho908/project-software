import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, ValidateIf } from "class-validator";
import * as _ from "lodash";

export class GetStrategiesParams {
  @ApiProperty({
    example: 0,
    required: false,
    description: "0 is Waiting for Accept, 1 is Accepted"
  })
  @ValidateIf((object, value) => !_.isEmpty(value))
  @IsNumberString()
  public status?: number;
}