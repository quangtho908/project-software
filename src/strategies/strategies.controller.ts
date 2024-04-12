import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { StrategiesService } from "./strategies.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateStrategyBody, StrategiesParams } from "./Request";
import { AuthGuard } from "src/common/guard/auth.guard";
import { User } from "src/common/decorators";
import { Users } from "src/entities";
import * as _ from "lodash";
import { RoleGuard } from "src/common/guard/role.guard";
import { UserRole } from "src/common/constant";

@ApiTags("strategy")
@Controller()
export class StrategiesController {
  constructor(private strategiesService: StrategiesService) {}

  @Get("strategies")
  public get(@Query() params: StrategiesParams) {
    if(!_.isEmpty(params.id)) {
      return this.strategiesService.getOne(params);
    }

    return this.strategiesService.getList(params);
  }

  @ApiBearerAuth()
  @UseGuards(new RoleGuard(UserRole.ADMIN))
  @UseGuards(AuthGuard)
  @Post("strategy")
  public create(@Body() body: CreateStrategyBody, @User() user: Users) {
    return this.strategiesService.create(body, user);
  }

  @ApiBearerAuth()
  @UseGuards(new RoleGuard(UserRole.SCHOOL))
  @UseGuards(AuthGuard)
  @Put("strategy/accept/:id")
  public accept(@Param("id") id: number) {
    return this.strategiesService.accept(id);
  }
}