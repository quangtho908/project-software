import { Global, Module } from "@nestjs/common";
import { BcryptService } from "./services/bcrypt.service";
import { TokenService } from "./services/token.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tokens } from "src/entities";
import { AuthGuard } from "./guard/auth.guard";
import { UserModule } from "src/users/user.module";
import { RoleGuard } from "./guard/role.guard";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Tokens]), UserModule],
  providers: [BcryptService, TokenService, AuthGuard, RoleGuard],
  exports: [BcryptService, TokenService, AuthGuard]
})
export class CommonModule {}