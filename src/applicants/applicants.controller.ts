import { Body, Controller, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {  CreateApplicantBody, GetApplicantParam, UpdateStatusApplyBody } from "./Request";
import { ApplicantsService } from "./applicants.service";
import { ApplicantStrategyService } from "./applicantStrategy.service";
import { RoleGuard } from "src/common/guard/role.guard";
import { UserRole } from "src/common/constant";
import { AuthGuard } from "src/common/guard/auth.guard";
import * as _ from "lodash";

@ApiTags("applicants")
@Controller()
export class ApplicantsController {

  constructor(
    private applicantsService: ApplicantsService,
    private appliStraService: ApplicantStrategyService
  ) {}


  @ApiBearerAuth()
  @UseGuards(new RoleGuard(UserRole.SCHOOL))
  @UseGuards(AuthGuard)
  @Get("applicant")
  public get(@Query() params: GetApplicantParam) {
    if(_.isEmpty(params.applicant)) {
      return this.applicantsService.getList(params);
    }

    return this.applicantsService.getOne(params)
  }
  
  @Post("applicant")
  public create(@Body() body: CreateApplicantBody) {
    return this.applicantsService.create(body);
  }

  @ApiBearerAuth()
  @UseGuards(new RoleGuard(UserRole.ADMIN))
  @UseGuards(AuthGuard)
  @Put("applicant/accept")
  public accept(@Body() body: UpdateStatusApplyBody) {
    return this.appliStraService.accept(body);
  }

  @ApiBearerAuth()
  @UseGuards(new RoleGuard(UserRole.SCHOOL))
  @UseGuards(AuthGuard)
  @Put("applicant/cancel")
  public reject(@Body() body: UpdateStatusApplyBody) { 
    return this.appliStraService.reject(body)
  }
  
}