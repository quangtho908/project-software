import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import * as _ from "lodash";
import { Users } from "src/entities";
import { UserRole } from "../constant";

export class RoleGuard implements CanActivate {

  constructor(private role: number) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if(Object.values(UserRole).indexOf(this.role) < 0) {
      throw new ForbiddenException(["Permission is required"])
    }

    const user: Users = request["user"];
    if(_.isEmpty(user)) {
      throw new ForbiddenException(["Permission is required"])
    }

    if(user.role > this.role) {
      throw new ForbiddenException(["Permission is required"])
    }
    return true;
  }
}