import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Successfully } from "src/common/model/response.model";
import { Universities } from "src/entities";
import { Repository } from "typeorm";

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
}