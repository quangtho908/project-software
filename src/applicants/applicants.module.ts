import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Applicants } from "src/entities";
import { ApplicantsController } from "./applicants.controller";
import { ApplicantsService } from "./applicants.service";
import { UniversitiesModule } from "src/universities/universities.module";
import { StrategiesModule } from "src/strategies/strategies.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Applicants]),
    UniversitiesModule,
    StrategiesModule
  ],
  controllers: [ApplicantsController],
  providers: [ApplicantsService]
})
export class ApplicantsModule { }