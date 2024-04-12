import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/entities";
import { UserService } from "./user.service";
import { UniversitiesModule } from "src/universities/universities.module";
import { UserController } from "./user.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    forwardRef(() => UniversitiesModule)   
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }