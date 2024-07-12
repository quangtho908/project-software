import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/entities";
import { UserService } from "./user.service";
import { UniversitiesModule } from "src/universities/universities.module";
import { UserController } from "./user.controller";
import { ApplicantsModule } from "src/applicants/applicants.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    forwardRef(() => UniversitiesModule),
    forwardRef(() => ApplicantsModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }