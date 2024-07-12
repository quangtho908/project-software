import { Body, Controller, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {  CreateApplicantBody, GetApplicantParam, GetStrategiesParams, UpdateStatusApplyBody } from "./Request";
import { ApplicantsService } from "./applicants.service";
import { ApplicantStrategyService } from "./applicantStrategy.service";
import { RoleGuard } from "src/common/guard/role.guard";
import { UserRole } from "src/common/constant";
import { AuthGuard } from "src/common/guard/auth.guard";
import * as _ from "lodash";
import { User } from "src/common/decorators";
import { Users } from "src/entities";

@ApiTags("applicants")
@Controller("applicant")
export class ApplicantsController {

  constructor(
    private applicantsService: ApplicantsService,
    private appliStraService: ApplicantStrategyService
  ) {}


  @ApiBearerAuth()
  @UseGuards(new RoleGuard(UserRole.SCHOOL))
  @UseGuards(AuthGuard)
  @Get()
  public get(@Query() params: GetApplicantParam) {
    if(_.isEmpty(params.applicant)) {
      return this.applicantsService.getList(params);
    }

    return this.applicantsService.getOne(params)
  }

  @ApiBearerAuth()
  @UseGuards(new RoleGuard(UserRole.STUDENT))
  @UseGuards(AuthGuard)
  @Get("strategies")
  public getStrategies(@Query() params: GetStrategiesParams, @User() user: Users) {
    return this.appliStraService.getStrategies(params, user);
  }

  @ApiBearerAuth()
  @UseGuards(new RoleGuard(UserRole.STUDENT))
  @UseGuards(AuthGuard)
  @Post()
  public create(@Body() body: CreateApplicantBody, @User() user: Users) {
    return this.applicantsService.create(body, user);
  }

  @ApiBearerAuth()
  @UseGuards(new RoleGuard(UserRole.ADMIN))
  @UseGuards(AuthGuard)
  @Put("accept")
  public accept(@Body() body: UpdateStatusApplyBody) {
    return this.appliStraService.accept(body);
  }

  @ApiBearerAuth()
  @UseGuards(new RoleGuard(UserRole.SCHOOL))
  @UseGuards(AuthGuard)
  @Put("cancel")
  public reject(@Body() body: UpdateStatusApplyBody) { 
    return this.appliStraService.reject(body)
  }
  
}