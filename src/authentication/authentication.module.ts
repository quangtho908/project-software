import { Module } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { UserModule } from "src/users/user.module";
import { UniversitiesModule } from "src/universities/universities.module";
import { UniversitiesService } from "src/universities/universities.service";
@Module({
  imports: [
    UserModule, 
    UniversitiesModule,
    UniversitiesModule
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService]
})
export class AuthenticationModule { }