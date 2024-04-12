import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UniversitiesService } from "./universities.service";
import { UniversityCreateBody } from "./Request";
import { User } from "src/common/decorators";
import { Users } from "src/entities";
import { AuthGuard } from "src/common/guard/auth.guard";

@ApiTags("university")
@Controller()
export class UniversitiesController {
  constructor(private universitiesService: UniversitiesService) { }

  @Get("universities")
  public get() {
    return this.universitiesService.find();
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post("university")
  public create(@Body() body: UniversityCreateBody, @User() user: Users) {
    return this.universitiesService.create(body, user);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete("university/:id")
  public delete(@Param("id") id: number) {
    return this.universitiesService.delete(id);
  }
}