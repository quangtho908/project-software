import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumberString, ValidateIf } from "class-validator";
import * as _ from "lodash";
import { ApplicantStatus } from "src/common/constant";

export class GetApplicantParam {
  @ApiProperty({
    example: 1,
    required: false
  })
  @ValidateIf((object, value) => !_.isEmpty(value))
  @IsNumberString()
  applicant: number

  @ApiProperty({
    example: 1,
    required: true
  })
  @IsNotEmpty()
  @IsNumberString()
  strategy: number

  @ApiProperty({ 
    example: 0,
    required: false
  })
  @ValidateIf((object, value) => !_.isEmpty(value))
  @IsNumberString()
  @IsIn(Object.values(ApplicantStatus).map(v => v.toString()))
  status: number
}