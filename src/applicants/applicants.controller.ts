import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateApplicantBody } from "./Request";
import { ApplicantsService } from "./applicants.service";

@ApiTags("applicants")
@Controller()
export class ApplicantsController {

  constructor(private applicantsService: ApplicantsService) {}

  @Post("applicant")
  public create(@Body() body: CreateApplicantBody) {
    return this.applicantsService.create(body);
  }
}