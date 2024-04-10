import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { TokenService } from "../services/token.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest<Request>();
    const tokenHeader = request.headers.authorization.split(" ")[1];
    if (!tokenHeader) {
      throw new UnauthorizedException(["Unauthorized"]);
    }

    const currentToken = await this.tokenService.getTokenByValue(tokenHeader);
    if (!currentToken || currentToken?.isExpried) {
      throw new UnauthorizedException(["Unauthorized"]);
    }

    return true;
  }
}