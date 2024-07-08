import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LoginBody, SignupBody } from "./Request";
import { AuthenticationService } from "./authentication.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "src/common/decorators";
import { Users } from "src/entities";
@ApiTags("auth")
@Controller("auth")
export class AuthenticationController {

  constructor(private authService: AuthenticationService) {}

  @Post("login")
  public login(@Body() body: LoginBody) {
    return this.authService.login(body);
  }

  @ApiBearerAuth()
  @UseGuards()
  @Post("logout")
  public logout(@User() user: Users) {
    return this.authService.logout(user)
  }

  @Post("signup")
  public signup(@Body() body: SignupBody) {
    return this.authService.signup(body)
  }
}