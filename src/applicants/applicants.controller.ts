import { Body, Controller, Delete, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdateApplyParam, CreateApplicantBody } from "./Request";
import { ApplicantsService } from "./applicants.service";
import { ApplicantStrategyService } from "./applicantStrategy.service";
import { AcceptApplyBody } from "./Request";
import { RoleGuard } from "src/common/guard/role.guard";
import { UserRole } from "src/common/constant";
import { AuthGuard } from "src/common/guard/auth.guard";

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

  @ApiBearerAuth()
  @UseGuards(new RoleGuard(UserRole.SCHOOL))
  @UseGuards(AuthGuard)
  @Put("applicant/accept")
  public accept(@Body() body: AcceptApplyBody) {
    return this.appliStraService.accept(body);
  }

  @ApiBearerAuth()
  @UseGuards(new RoleGuard(UserRole.SCHOOL))
  @UseGuards(AuthGuard)
  @Delete("applicant/:id/:strategy")
  private reject(@Param() param: UpdateApplyParam) { 
    return this.appliStraService.remove(param)
  }
  
}