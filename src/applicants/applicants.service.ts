import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Applicants, Strategies, Users } from "src/entities";
import { StrategiesService } from "src/strategies/strategies.service";
import { UniversitiesService } from "src/universities/universities.service";
import { Repository } from "typeorm";
import { CreateApplicantBody } from "./Request";
import * as _ from "lodash";
import { Successfully } from "src/common/model/response.model";

@Injectable()
export class ApplicantsService {
  constructor(
    private universitiesService: UniversitiesService,
    private strategiesService: StrategiesService,
    @InjectRepository(Applicants)
    private applicantsRepo: Repository<Applicants>
  ) { }

  public async create(body: CreateApplicantBody) {
    const { university, strategy, ...data } = body;
    const [uninversityExist, strategyExist] = await Promise.all([
      this.universitiesService.findById(university),
      this.strategiesService.findById(strategy)
    ]);

    if (_.isEmpty(uninversityExist)) {
      throw new BadRequestException(["University is invalid"])
    }

    if (_.isEmpty(strategyExist)) {
      throw new BadRequestException(["Strategy is invalid"])
    }

    const applicant = await this.applicantsRepo.findOne({
      where: { email: body.email },
      relations: { strategies: true, university: true }
    });

    if (!_.isEmpty(applicant)) {
      return this.addStrategy(applicant, strategyExist);
    }

    const newApplicant = this.applicantsRepo.create({
      ...data,
      university: uninversityExist,
      strategies: [strategyExist],
      createdAt: new Date()
    })

    const saveApplicant = await this.applicantsRepo.save(newApplicant);
    return new Successfully({
      ..._.omit(saveApplicant, ["updatedBy"])
    })

  }

  public async addStrategy(applicant: Applicants, strategy: Strategies) {
    const exitsStrategy = _.some(applicant.strategies, { id: strategy.id });
    if (exitsStrategy) {
      return new Successfully(applicant)
    }

    applicant.strategies.push(strategy)

    const updatedApplicants = this.applicantsRepo.save(applicant);
    return new Successfully(applicant)
  }
}