import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Universities } from "src/entities";
import { UniversitiesService } from "./universities.service";
import { UniversitiesController } from "./universities.controller";
import { UserModule } from "src/users/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Universities]),
    UserModule
  ],
  controllers: [UniversitiesController],
  providers: [UniversitiesService],
  exports: [UniversitiesService]
})
export class UniversitiesModule { }