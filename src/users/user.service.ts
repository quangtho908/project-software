import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>
  ) { }

  public findUserByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  public findById(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}