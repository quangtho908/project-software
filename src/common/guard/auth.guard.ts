import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { TokenService } from "../services/token.service";
import { UserService } from "src/users/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest<Request>();
    const tokenHeader = request.headers.authorization?.split(" ")[1];
    if (!tokenHeader) {
      throw new UnauthorizedException(["Unauthorized"]);
    }

    const currentToken = await this.tokenService.getTokenByValue(tokenHeader);
    if (!currentToken || currentToken?.isExpried) {
      throw new UnauthorizedException(["Unauthorized"]);
    }

    const jsonVerify = this.tokenService.verifyToken(currentToken.token);
    const user = await this.userService.findById(jsonVerify.id);
    request["user"] = user;

    return true;
  }
}