import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UniversitiesService } from "./universities.service";

@ApiTags("university")
@Controller()
export class UniversitiesController {
  constructor(private universitiesService: UniversitiesService) { }

  @Get("universities")
  public get() {
    return this.universitiesService.find();
  }
}