import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UniversitiesService } from "./universities.service";
import { UniversityCreateBody } from "./Request";
import { User } from "src/common/decorators";
import { Users } from "src/entities";
import { AuthGuard } from "src/common/guard/auth.guard";
import { RoleGuard } from "src/common/guard/role.guard";
import { UserRole } from "src/common/constant";

@ApiTags("university")
@Controller()
export class UniversitiesController {
  constructor(private universitiesService: UniversitiesService) { }

  @Get("universities")
  public get() {
    return this.universitiesService.find();
  }
  @ApiBearerAuth()
  @UseGuards(new RoleGuard(UserRole.ADMIN))
  @UseGuards(AuthGuard)
  @Post("university")
  public create(@Body() body: UniversityCreateBody, @User() user: Users) {
    return this.universitiesService.create(body, user);
  }
  
  @ApiBearerAuth()
  @UseGuards(new RoleGuard(UserRole.ADMIN))
  @UseGuards(AuthGuard)
  @Delete("university/:id")
  public delete(@Param("id") id: number) {
    return this.universitiesService.delete(id);
  }
}