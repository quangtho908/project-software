import { ApiProperty } from "@nestjs/swagger";

export class StrategiesParams {
  @ApiProperty({
    required: false
  })
  public id: number;

  @ApiProperty({
    example: 1,
    required: false
  })
  public university: number;

  @ApiProperty({
    example: 0,
    required: false,
    description: "0 is Waiting for Accept, 1 is Accepted"
  })
  public status: number;
}