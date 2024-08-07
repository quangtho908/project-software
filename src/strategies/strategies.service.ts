import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategies, Users } from "src/entities";
import { Repository } from "typeorm";
import { CreateStrategyBody, StrategiesParams } from "./Request";
import { UniversitiesService } from "src/universities/universities.service";
import { Successfully } from "src/common/model/response.model";
import * as _ from "lodash";
import { StrategyStatus } from "src/common/constant";

@Injectable()
export class StrategiesService {

  constructor(
    @InjectRepository(Strategies)
    private strategiesRepo: Repository<Strategies>,
    private universitiesService: UniversitiesService
  ) { }

  public findById(id: number) {
    return this.strategiesRepo.findOneBy({ id });
  }

  public async getOne(data: StrategiesParams) {
    if (_.isEmpty(data.university)) {
      const strategy = await this.strategiesRepo.findOneBy(data);
      if (_.isEmpty(strategy)) {
        throw new NotFoundException(["Strategy is not exist"])
      }
      return new Successfully(strategy);
    }

    const { university: universityId, ...query } = data;
    const university = await this.universitiesService.findById(universityId)

    const strategy = await this.strategiesRepo.findOneBy({ ...query, universities: [university] })
    if (_.isEmpty(strategy)) {
      throw new NotFoundException(["Strategy is not exist"])
    }

    return new Successfully(strategy);
  }

  public async getList(data: StrategiesParams) {
    if (_.isEmpty(data.university)) {
      const strategies = await this.strategiesRepo.findBy(data);
      return new Successfully(strategies);
    }

    const { university: universityId, ...query } = data;
    const university = await this.universitiesService.findById(universityId)

    if (_.isEmpty(university)) {
      throw new NotFoundException(["University is not exist"])
    };

    const strategies = await this.strategiesRepo.findBy({ ...query, universities: [university] })

    return new Successfully(strategies);
  }

  public async create(body: CreateStrategyBody, user: Users) {
    const { university, ...data } = body;
    const universityExist = await this.universitiesService.findById(body.university)
    if (!universityExist) {
      throw new BadRequestException(["University is not exist!"]);
    }

    const newStrategy = this.strategiesRepo.create({
      ...data,
      universities: [universityExist],
      createdAt: new Date(),
      createdBy: user
    })

    const result = await this.strategiesRepo.save(newStrategy);

    return new Successfully({
      ...result,
      createdBy: {
        id: user.id,
        name: user.fullName
      }
    })
  }

  public async accept(id: number) {
    const strategy = await this.findById(id);
    if (!strategy) {
      throw new NotFoundException(["Strategy is not exist"]);
    }

    strategy.status = StrategyStatus.ACCEPTED;

    await this.strategiesRepo.save(strategy);
    return new Successfully()
  }

  public async cancel(id: number) {
    const strategy = await this.findById(id);
    if(!strategy) {
      throw new NotFoundException(["Strategy is not exist"])
    }

    strategy.status = StrategyStatus.CANCEL;
    await this.strategiesRepo.save(strategy);
    return new Successfully();
  }

  public async delete(id: number) {
    const strategy = await this.findById(id);
    if (!strategy) {
      throw new NotFoundException(["Strategy is not exist"]);
    }

    await this.strategiesRepo.delete({ id })

    return new Successfully()
  }
}