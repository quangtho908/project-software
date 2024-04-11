import { Body, Controller, Delete, Param, Post, Put, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UpdateApplyParam, CreateApplicantBody } from "./Request";
import { ApplicantsService } from "./applicants.service";
import { ApplicantStrategyService } from "./applicantStrategy.service";

@ApiTags("applicants")
@Controller()
export class ApplicantsController {

  constructor(
    private applicantsService: ApplicantsService,
    private appliStraService: ApplicantStrategyService
  ) {}

  @Post("applicant")
  public create(@Body() body: CreateApplicantBody) {
    return this.applicantsService.create(body);
  }

  @Put("applicant/accept")
  public accept(@Body() body: UpdateApplyParam) {
    return this.appliStraService.accept(body);
  }

  @Delete(":id/:strategy")
  private reject(@Param() param: UpdateApplyParam) { 
    return this.appliStraService.remove(param)
  }
  
}