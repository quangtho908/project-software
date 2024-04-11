import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
}