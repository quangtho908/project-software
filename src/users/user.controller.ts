import { Body, Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";
import { CreateSchoolUserBody } from "./Request";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RoleGuard } from "src/common/guard/role.guard";
import { UserRole } from "src/common/constant";
import { AuthGuard } from "src/common/guard/auth.guard";

@ApiTags("users")
@Controller("users")
export class UserController {

  constructor(private userService: UserService) {}

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