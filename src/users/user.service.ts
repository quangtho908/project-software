import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities";
import { Repository } from "typeorm";
import { CreateSchoolUserBody, GetUserQuery } from "./Request";
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

  public async getOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { organization: true }
    })
    if (_.isEmpty(user)) {
      throw new NotFoundException(["User is not exist"])
    }

    return new Successfully({
      ..._.omit(user, "password")
    })
  }

  public async getMany(data: GetUserQuery) {
    if (_.isEmpty(data.university)) {
      const users = await this.userRepository.find({ relations: { organization: true } })
      return new Successfully(users)
    }
    const university = await this.universitiesService.findById(data.university);

    if (_.isEmpty(university)) {
      throw new BadRequestException(["University is not exist"])
    }

    const users = await this.userRepository.find({
      where: { organization: university },
      relations: { organization: true }
    })
    const result = _.map(users, user => {
      return _.omit(user, "password")
    })

    return new Successfully(result)
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

    if (user.role === UserRole.ADMIN) {
      throw new BadRequestException(["Can not remove admin"])
    }

    await this.userRepository.delete({ id })
    return new Successfully()
  }
}