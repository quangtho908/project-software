import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Successfully } from "src/common/model/response.model";
import { Universities, Users } from "src/entities";
import { Repository } from "typeorm";
import { UniversityCreateBody } from "./Request";
import * as _ from "lodash";

@Injectable()
export class UniversitiesService {
  constructor(
    @InjectRepository(Universities)
    private universitiesRepo: Repository<Universities>
  ) { }

  public findById(id: number) {
    return this.universitiesRepo.findOneBy({ id });
  }

  public async find() {
    const universities = await this.universitiesRepo.find({
      select: ["id", "name", "code", "image"]
    })

    return new Successfully(universities);
  }

  public async create(body: UniversityCreateBody, user: Users) {
    const newUniversity = this.universitiesRepo.create({
      ...body,
      createdAt: new Date(),
      createdBy: user
    })

    const savedUniversity = await this.universitiesRepo.save(newUniversity);
    return new Successfully({
      ...savedUniversity,
      createdBy: {
        id: user.id,
        fullName: user.fullName
      }
    })
  }

  public async delete(id: number) {
    const university = await this.findById(id);
    if (_.isEmpty(university)) {
      throw new NotFoundException("University not found")
    }

    await this.universitiesRepo.delete({ id })
    return new Successfully()
  }
}