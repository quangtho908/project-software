import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { CreateSchoolUserBody, GetUserQuery } from "./Request";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RoleGuard } from "src/common/guard/role.guard";
import { UserRole } from "src/common/constant";
import { AuthGuard } from "src/common/guard/auth.guard";
import * as _ from "lodash";

@ApiTags("users")
@Controller("users")
export class UserController {

  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(new RoleGuard(UserRole.SCHOOL))
  @UseGuards(AuthGuard)
  @Get()
  public get(@Query() body: GetUserQuery) {
    if(_.isEmpty(body.id)) {
      return this.userService.getMany(body)
    }

    return this.userService.getOne(body.id)
  }

  @ApiBearerAuth()
  @UseGuards(new RoleGuard(UserRole.ADMIN))
  @UseGuards(AuthGuard)
  @Post("university")
  public createAccountSchool(@Body() body:CreateSchoolUserBody) {
    return this.userService.createSchoolUser(body);
  }

  @ApiBearerAuth()
  @UseGuards(new RoleGuard(UserRole.ADMIN))
  @UseGuards(AuthGuard)
  @Delete(":id")
  public delete(@Param("id") id: number) {
    return this.userService.delete(id);
  }
}