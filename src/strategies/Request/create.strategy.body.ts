import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsNotEmpty } from "class-validator";

export class CreateStrategyBody {

  @ApiProperty({
    example: "Mùa hè xanh: Hành động cho môi trường",
    required: true
  })
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    example: 1,
    required: true
  })
  @IsNotEmpty()
  public university: number;

  @ApiProperty({
    example: "TP.Thủ Đức, TP.Hồ Chí Minh",
    required: true
  })
  @IsNotEmpty()
  public place: string;

  @ApiProperty({
    example: new Date(),
    required: true
  })
  @IsNotEmpty()
  @IsDateString({}, { message: "Date is not empty" })
  public startAt: Date;

  @ApiProperty({
    example: new Date(),
    required: true
  })
  @IsNotEmpty()
  @IsDateString({}, { message: "Date is not empty" })
  public endAt: Date;

  @ApiProperty({ example: "", description: "can empty" })
  public image: string;

  @ApiProperty({
    example: "Mùa hè xanh: Hành động cho môi trường",
    required: true
  })
  @IsNotEmpty()
  public description: string;
}