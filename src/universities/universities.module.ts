import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Universities } from "src/entities";
import { UniversitiesService } from "./universities.service";

@Module({
  imports: [TypeOrmModule.forFeature([Universities])],
  providers: [UniversitiesService],
  exports: [UniversitiesService]
})
export class UniversitiesModule {}