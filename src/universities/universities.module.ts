import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Universities } from "src/entities";
import { UniversitiesService } from "./universities.service";
import { UniversitiesController } from "./universities.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Universities])],
  controllers: [UniversitiesController],
  providers: [UniversitiesService],
  exports: [UniversitiesService]
})
export class UniversitiesModule {}