import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/entities";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }