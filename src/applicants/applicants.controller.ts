import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UpdateApplyParam, CreateApplicantBody } from "./Request";
import { ApplicantsService } from "./applicants.service";
import { ApplicantStrategyService } from "./applicantStrategy.service";
import { AcceptApplyBody } from "./Request";

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
  public accept(@Body() body: AcceptApplyBody) {
    return this.appliStraService.accept(body);
  }

  @Delete("applicant/:id/:strategy")
  private reject(@Param() param: UpdateApplyParam) { 
    return this.appliStraService.remove(param)
  }
  
}