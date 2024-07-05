import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Applicants, Strategies } from "src/entities";
import { StrategiesService } from "src/strategies/strategies.service";
import { UniversitiesService } from "src/universities/universities.service";
import { Repository } from "typeorm";
import { CreateApplicantBody, GetApplicantParam } from "./Request";
import * as _ from "lodash";
import { Successfully } from "src/common/model/response.model";
import { ApplicantStrategyService } from "./applicantStrategy.service";
import { ApplicantStatus } from "src/common/constant";

@Injectable()
export class ApplicantsService {
  constructor(
    private universitiesService: UniversitiesService,
    private strategiesService: StrategiesService,
    private appliStraService: ApplicantStrategyService,
    @InjectRepository(Applicants)
    private applicantsRepo: Repository<Applicants>
  ) { }

  public async getOne(params: GetApplicantParam) {
    const strategy = await this.strategiesService.findById(params.strategy);
    if(_.isEmpty(strategy)) {
      throw new BadRequestException(["Strategy is not exist"])
    }

    const applicant = await this.appliStraService.findOneBy(params)
    if(_.isEmpty(applicant)) {
      throw new BadRequestException(["Applicant is Change status or not have in Strategy"])
    }
    return new Successfully({
      ...applicant.applicant2,
      status: applicant.status
    })

  }

  public async getList(params: GetApplicantParam) {
    const strategy = await this.strategiesService.findById(params.strategy);
    if(_.isEmpty(strategy)) {
      throw new BadRequestException(["Strategy is not exist"])
    }

    const applicants = await this.appliStraService.findManyBy(params)
    const result = _.map(applicants, (applicant) => ({
      ...applicant.applicant2,
      status: applicant.status
    }))

    return new Successfully(result)
  }

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
      relations: { university: true }
    });
    
    if(!_.isEmpty(applicant)) {
      const existAppliStra = await this.appliStraService.find(strategy, applicant.id);

      if(!_.isEmpty(existAppliStra) && existAppliStra.status !== ApplicantStatus.CANCELED) {
        throw new BadRequestException(["You already in this strategy"])
      }
    }

    const newApplicant = this.applicantsRepo.create({
      ...data,
      university: uninversityExist,
      createdAt: new Date()
    })

    const saveApplicant = await this.applicantsRepo.save(newApplicant);

    await this.appliStraService.create(strategyExist, saveApplicant);
    return new Successfully({
      ..._.omit(saveApplicant, ["updatedBy"])
    })

  }
}