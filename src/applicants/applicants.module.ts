import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Applicants } from "src/entities";
import { ApplicantsController } from "./applicants.controller";
import { ApplicantsService } from "./applicants.service";
import { UniversitiesModule } from "src/universities/universities.module";
import { StrategiesModule } from "src/strategies/strategies.module";
import { ApplicantsStrategies } from "src/entities/ApplicantsStrategies";
import { ApplicantStrategyService } from "./applicantStrategy.service";
import { UserModule } from "src/users/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Applicants, ApplicantsStrategies]),
    forwardRef(() => UserModule),
    UniversitiesModule,
    StrategiesModule,
  ],
  controllers: [ApplicantsController],
  providers: [ApplicantsService, ApplicantStrategyService]
})
export class ApplicantsModule { }