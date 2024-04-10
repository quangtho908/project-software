import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LoginBody } from "./Request";
import { AuthenticationService } from "./authentication.service";
import { AuthGuard } from "src/common/guard/auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthenticationController {

  constructor(private authService: AuthenticationService) {}

  @Post("login")
  public login(@Body() body: LoginBody) {
    return this.authService.login(body);
  }

  @UseGuards(AuthGuard)
  @Post()
  public test() {
    return "ok";
  }

}