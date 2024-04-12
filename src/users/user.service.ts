import { BadRequestException, Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities";
import { Repository } from "typeorm";
import { CreateSchoolUserBody } from "./Request";
import { UniversitiesService } from "src/universities/universities.service";
import * as _ from "lodash";
import { BcryptService } from "src/common/services/bcrypt.service";
import { Successfully } from "src/common/model/response.model";
import { UserRole } from "src/common/constant";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @Inject(forwardRef(() => UniversitiesService))
    private universitiesService: UniversitiesService,
    private bcryptService: BcryptService
  ) { }

  public findUserByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  public findById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  public async createSchoolUser(body: CreateSchoolUserBody) {
    const { universityId, ...data } = body
    const [university, userExist] = await Promise.all([
      this.universitiesService.findById(body.universityId),
      this.findUserByEmail(body.email)
    ])
    if (!_.isEmpty(userExist)) {
      throw new BadRequestException(["User is already"])
    }

    if (_.isEmpty(university)) {
      throw new BadRequestException(["University is not exist"])
    }

    const password = await this.bcryptService.hashPassword(university.code);

    const newUser = this.userRepository.create({
      ...data,
      organization: university,
      password,
      createdAt: new Date(),
      role: UserRole.SCHOOL
    })

    const savedUser = await this.userRepository.save(newUser)
    return new Successfully({
      ..._.omit(savedUser, "password")
    })
  }

  public async delete(id: number) {
    const user = await this.findById(id);
    if (_.isEmpty(user)) {
      throw new BadRequestException(["User is not exist"])
    }

    await this.userRepository.delete({ id })
    return new Successfully()
  }
}