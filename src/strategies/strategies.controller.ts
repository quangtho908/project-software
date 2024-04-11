import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { StrategiesService } from "./strategies.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateStrategyBody, StrategiesParams } from "./Request";
import { AuthGuard } from "src/common/guard/auth.guard";
import { User } from "src/common/decorators";
import { Users } from "src/entities";
import * as _ from "lodash";

@ApiTags("strategy")
@Controller()
export class StrategiesController {
  constructor(private strategiesService: StrategiesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get("strategies")
  public get(@Query() params: StrategiesParams) {
    if(!_.isEmpty(params.id)) {
      return this.strategiesService.getOne(params);
    }

    return this.strategiesService.getList(params);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post("strategy")
  public create(@Body() body: CreateStrategyBody, @User() user: Users) {
    return this.strategiesService.create(body, user);
  }
}