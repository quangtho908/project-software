import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Strategies } from "src/entities";
import { StrategiesService } from "./strategies.service";
import { StrategiesController } from "./strategies.controller";
import { UniversitiesModule } from "src/universities/universities.module";
import { UserModule } from "src/users/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Strategies]),
    UniversitiesModule,
    UserModule
  ],
  providers: [StrategiesService],
  controllers: [StrategiesController],
  exports: [StrategiesService]
})
export class StrategiesModule {}